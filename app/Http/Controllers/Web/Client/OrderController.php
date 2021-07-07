<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\Order;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;
use App\Models\DeliveryMethod;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\CartServiceInterface;
use App\Http\Requests\ClientOrderStoreRequest;
use App\Interfaces\OrderServiceInterface;

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
    public function index()
    {
        $orders = Order::where('client_id', Auth::id())->paginatnate(10);
        return view('store.order.index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
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
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClientOrderStoreRequest $request)
    {

        $data = $request->validated();

        if ($data['deliveryMethodId'] == 1) {
            if (array_key_exists('deliveryAddress', $data)) {
                $data['address'] = Address::where('user_id', Auth::id())->where('id', $data['deliveryAddress'])->pluck('address')->first();
            }

            if (array_key_exists('newAddress', $data)) {
                $data['address'] = $data['newAddress'];
            }

            if (Auth::check()) {
                $data['client_id'] = Auth::id();
                $data['phoneNumber'] = Auth::user()->phone_number;
                $data['name'] = Auth::user()->first_name;
                $data['email'] = Auth::user()->email;
            }
        }

        if ($data['deliveryMethodId'] == 2) {
            if (Auth::check()) {
                $data['client_id'] = Auth::id();
                $data['phoneNumber'] = Auth::user()->phone_number;
                $data['name'] = Auth::user()->first_name;
                $data['email'] = Auth::user()->email;
            }
        }

        $cartItems=  $this->cartService->getCatItems(session('cartId'));

        $data['items'] = [];

        foreach($cartItems as $item) {
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

        // return redirect()->route('orders.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
