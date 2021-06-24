<?php

namespace App\Http\Controllers\Web\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\CartServiceInterface;

class CartController extends Controller
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
        $cart = $this->cartService->getCart(Auth::user(), session()->getId());

        return view('store.cart', ['cart' => $cart]);
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
