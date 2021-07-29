<?php

namespace App\Http\Controllers\Web\Client;

use App\Exceptions\NotInStockException;
use Exception;
use App\Models\Order;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;
use App\Models\DeliveryMethod;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\CartServiceInterface;
use App\Interfaces\OrderServiceInterface;
use App\Http\Requests\ClientOrderStoreRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
    private $cartService;
    private $orderService;

    public function __construct(CartServiceInterface $cartService, OrderServiceInterface $orderService)
    {
        $this->cartService = $cartService;
        $this->orderService = $orderService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orderBy = 1;

        if ($request->has('orderBy')) {
            $orderBy = $request->orderBy;
        }

        $orders = $this->orderService->getOrders(5, $request->orderBy, $request->all(), Auth::id());

        return view('store.orders.index', compact('orders', 'orderBy'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

			try {
$paymentMethods = PaymentMethod::withTrashed()->get();
        $deliveryMethods = DeliveryMethod::withTrashed()->get();

        $cart = $this->cartService->getCart(Auth::id(), session()->getId());

        $orderTotalValue = 0;
        $orderTotalValue += $cart->totalValue;

        $selectedDeliveryMethodId = "";

        if ($request->has('deliveryMethod')) {
            $selectedDeliveryMethod = DeliveryMethod::findOrFail($request->deliveryMethod);
            $orderTotalValue += $selectedDeliveryMethod->price;
            $selectedDeliveryMethodId = $selectedDeliveryMethod->id;
        }

        if (Auth::check()) {
            $addresses = Address::where('user_id', Auth::id())->get();
            return view('store.checkout', compact('addresses', 'cart', 'deliveryMethods', 'paymentMethods', 'selectedDeliveryMethodId', 'orderTotalValue'));
        }

        return view('store.checkout', compact('cart', 'deliveryMethods', 'paymentMethods', 'selectedDeliveryMethodId', 'orderTotalValue'));
   
			} catch (\Exception $ex) {
				return redirect()->route('home');
			}
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClientOrderStoreRequest $request)
    {
        try {

            $data = $request->validated();

            if ($data['deliveryMethodId'] == 1) {
                if (array_key_exists('deliveryAddress', $data)) {
                    $data['address'] = Address::where('user_id', Auth::id())->where('id', $data['deliveryAddress'])->pluck('address')->first();
                }

                if (array_key_exists('newAddress', $data)) {
                    $data['address'] = $data['newAddress'];
                }

                if (Auth::check()) {
                    $data['clientId'] = Auth::id();
                    $data['phoneNumber'] = Auth::user()->phone_number;
                    $data['name'] = Auth::user()->first_name;
                    $data['email'] = Auth::user()->email;
                }
            }

            if ($data['deliveryMethodId'] == 2) {
                if (Auth::check()) {
                    $data['clientId'] = Auth::id();
                    $data['phoneNumber'] = Auth::user()->phone_number;
                    $data['name'] = Auth::user()->first_name;
                    $data['email'] = Auth::user()->email;
                }
            }

            $cartItems =  $this->cartService->getCatItems(session('cartId'));

            $data['items'] = [];

            foreach ($cartItems as $item) {
                $orderItem = [
                    'id' => $item->id,
                    'name' => $item->name,
                    'quantity' => $item->pivot->quantity,
                    'price' => $item->price
                ];
                array_push($data['items'], $orderItem);
            }

            $this->orderService->create($data, null);

            $cart = $this->cartService->getCart(Auth::id(), session()->getId());
            $cart->items()->detach();

            Toastr::success('Comanda a fost plasata cu succes !', 'Succes');

            return redirect()->route('menu.index');
        } catch (NotInStockException $nise) {
            Toastr::error($nise->getMessage(), 'Eroare');
            return redirect()->back()->withInput();

        } catch (\Exception $ex) {
            Toastr::error('A aparut o problema in plasarea comenzi, incearca dimnou mai tarziu !', 'Eroare');
            return redirect()->back()->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        try {
            $order = $this->orderService->getOrderById($id, Auth::id());

            return view('store.orders.show', compact('order'));
        } catch (ModelNotFoundException $e) {
            Toastr::info('Nu exista o comanda pentru id-ul ' . $id . ' !', 'Info');

            return redirect()->route('orders.index');
        }
    }
}
