<?php

namespace App\Http\Controllers\Web\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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
        $cart = $this->cartService->getCart(Auth::id(), session()->getId());

        return view('store.cart', ['cart' => $cart]);
    }

    public function store(Request $request, $productId)
    {
        try {
            $cart = $this->cartService->getCart(Auth::id(), session()->getId());
            
            if(is_null($cart)) {
                $cart = $this->cartService->createCart(Auth::id(), session()->getId());
                session(['cartId' =>$cart->id ]);
            }

            $this->cartService->addToCart($cart, $productId, $request->quantity);

            Cache::forget('cart');

            Toastr::success('Produsul a fost adaugat in cos', 'Succes');
            return redirect()->back();
        } catch ( \Exception $ex) {
            Toastr::error('Something went wrong, try again later', 'Error');
            return redirect()->back();
        }
      
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
            $cart = $this->cartService->getCart(Auth::id(), session()->getId());

            $this->cartService->patchCartItemQuantity($cart, $id, $request->quantity);

            Cache::forget('cart');

            Toastr::info('Cantitatea produsului a fost actualizata', 'Notification');
            return redirect()->back();
        } catch (\Exception $e) {
            Toastr::info('Something went wrong, try again later', 'Error');
            return redirect()->back();
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
            $cart = $this->cartService->getCart(Auth::id(), session()->getId());

            $this->cartService->removeItemFromCart($cart, $id);
            $cart->refresh();
            if(count($cart->items) == 0) {
               
                Toastr::info('Cosul este gol', 'Info');
                return redirect()->route('menu.index');
            }

            Cache::forget('cart');

            Toastr::success('Produsul a fost scos din cos', 'Success');
            return redirect()->back();
        } catch (\Exception $e) {
            Toastr::success('Something went wrong, try again later', 'Error');
            return redirect()->back();
        }
    }
}
