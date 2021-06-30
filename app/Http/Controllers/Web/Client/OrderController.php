<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Interfaces\CartServiceInterface;
use App\Models\Address;
use App\Models\DeliveryMethod;
use Illuminate\Support\Facades\Auth;

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
    public function create()
    {        
        // $paymentMethods = PaymentMethods::all();

        $deliveryMethods = DeliveryMethod::all();

        $items = $this->cartService->getCatItems(session('cartId'));

        if(Auth::check()) {
            $addresses = Address::where('user_id', Auth::id())->get();
            return view('store.checkout', compact('addresses', 'items', 'deliveryMethods'));
        }
        
        return view('store.checkout', compact('items', 'deliveryMethods'));
       

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
