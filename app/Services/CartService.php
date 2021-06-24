<?php


namespace App\Services;

use Exception;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Collection;
use App\Interfaces\CartServiceInterface;

class CartService implements CartServiceInterface
{
  public function getCart(User $user = null, string $sessionId): Cart
  {
    try {
      $cart = null;

      if (isset($user)) {
        $cart = $user->cart;
      }else {
        $cart = Cart::where('session_id', $sessionId)->first();
      }

      if(is_null($cart)) {
        $cart = $this->createCart($user, $sessionId);
      }

      return $cart;

    } catch (\Exception $e) {
      //log exception
      // throw new Exception('Something went wrong, try again !');
      throw new Exception($e->getMessage());
    }
  }

  public function createCart(User $user = null, string $sessionId): Cart 
  {
    try {
      $cart = new Cart();

      if(isset($user)) {
        $cart->user_id = $user->id;
      } else {
        $cart->session_id = $sessionId;
      }

      $cart->save();

      return $cart;
  
    } catch ( \Exception $e) {
      // log exception
      // throw new Exception('Failed to create new cart');
      throw new Exception($e->getMessage());
    }
   
  }

  public function getCatItems(int $cartId): Collection
  {
    $cart = Cart::with('items')->findOrFail($cartId);

    return $cart->items;
  }

  public function addToCart(Cart $cart, int $productId, int $quantity): int
  {
    try {
      if ($cart->items->contains('id', $productId)) {
        $item = $cart->items->firstWhere('id', $productId);
        $newQuantity = $item->pivot->quantity + $quantity;
        $this->patchCartItemQuantity($cart, $productId, $newQuantity);
      } else {
        $newQuantity = $quantity;
        $cart->items()->attach($productId, ['quantity' => $newQuantity]);
      }

      return $newQuantity;

    } catch (\Exception $e) {
      // throw new Exception('Something went wrong, try again !');
      throw new Exception($e->getMessage());
    }
  }

  public function patchCartItemQuantity(Cart $cart, int $productId, int $newQuantity): void
  {
    try {
      if ($newQuantity > 0) {
        $cart->items()->updateExistingPivot($productId, ['quantity' => $newQuantity]);
      } else {
        $this->removeItemFroMCart($cart, $productId);
      }
    } catch (\Exception $e) {
      // throw new Exception('Something went wrong, try again');
      throw new Exception($e->getMessage());
    }
  }

  public function removeItemFroMCart(Cart $cart, int $productId): void
  {
    try {
      $cart->items()->detach($productId);
    } catch (\Exception $e) {
      throw new Exception('Something went wrong, try again');
    }
  }
}
