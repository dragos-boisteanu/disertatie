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

    $cart = $this->cartService->getCart(Auth::user(), session()->getId());

    $view->with('cart', $cart);
  }
}
