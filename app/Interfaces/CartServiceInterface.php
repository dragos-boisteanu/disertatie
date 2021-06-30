<?php

namespace App\Interfaces;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Collection;

interface CartServiceInterface
{
  public function getCart(User $user = null, string $sessionId): Cart;
  public function getCartItemsCount(User $user = null, string $sessionId): int;
  public function createCart(User $user, string $sessionId): Cart;
  public function getCatItems(int $cartId): Collection;
  public function addToCart(Cart $cart, int $productId, int $quantity): int;
  public function patchCartItemQuantity(Cart $cart, int $productId, int $newQuantity): void;
  public function removeItemFromCart(Cart $cart, int $productId): void;
}