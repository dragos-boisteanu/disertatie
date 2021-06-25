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

        try {
            $cart = $this->cartService->getCart(Auth::user(), session()->getId());

            $this->cartService->patchCartItemQuantity($cart, $id, $request->quantity);

            return redirect()->back()->with('message', 'Cantitatea produsului a fost actualizata');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong, try again later');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $cart = $this->cartService->getCart(Auth::user(), session()->getId());

            $this->cartService->removeItemFromCart($cart, $id);


            return redirect()->back()->with('message', 'Produsul a fost scos din cos');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong, try again later');
        }
    }
}
