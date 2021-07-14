<?php

namespace App\Http\Composers;


use App\Models\Cart;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Interfaces\CartServiceInterface;

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
    
    $cart = $this->cartService->getCart(Auth::id(), session()->getId());
    

    if(is_null($cart)) {
      $cart = new Cart();
    }

    $view->with('cart', $cart);
  }
}
