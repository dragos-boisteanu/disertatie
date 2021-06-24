<?php

namespace App\View\Composers;

use App\Models\Cart;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\CartServiceInterface;
use App\Http\Resources\CartItemCollection;

class CartComposer
{

  private $cartService;

  public function __construct(CartServiceInterface $cartService)
  {
    $this->cartService = $cartService;
  }

  /**
   * Bind data to the view.
   *
   * @param  \Illuminate\View\View  $view
   * @return void
   */
  public function compose(View $view)
  {
    if(Auth::check()) {
      $cart = $this->cartService->getCart(Auth::user(), session()->getId());
    } else {
      $cart = $this->cartService->getCart(null, session()->getId());
    }

    $view->with('cartItems', json_encode(new CartItemCollection($cart->items)));
  }
}
