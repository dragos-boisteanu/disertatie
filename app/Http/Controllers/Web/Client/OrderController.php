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

class OrderController extends Controller
{
    private $cartService;

    public function __construct(CartServiceInterface $cartService)
    {
        $this->cartService = $cartService;
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

        if($request->has('deliveryMethod')) {
            $selectedDeliveryMethod = DeliveryMethod::findOrFail($request->deliveryMethod);
            $orderTotalValue += $selectedDeliveryMethod->price;
            $selectedDeliveryMethodId = $selectedDeliveryMethod->id;
        } 
            
        if(Auth::check()) {
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
    public function store(Request $request)
    {
        dd($request->all());
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
