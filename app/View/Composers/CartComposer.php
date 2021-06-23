<?php

namespace App\View\Composers;

use App\Interfaces\CartServiceInterface;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

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

    $view->with('cartItemsCount', $cart->itemsCount)->with('cartItems', $cart->items);
  }
}
