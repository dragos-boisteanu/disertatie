<?php

namespace App\Interfaces;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Collection;

interface CartServiceInterface
{
  public function getCart(int $userId = null, string $sessionId);
  public function getCartItemsCount(User $user = null, string $sessionId): int;
  public function createCart(int $userId = null, string $sessionId): Cart;
  public function getCatItems(int $cartId): Collection;
  public function addToCart(Cart $cart, int $productId, int $quantity): int;
  public function patchCartItemQuantity(Cart $cart, int $productId, int $newQuantity): void;
  public function removeItemFromCart(Cart $cart, int $productId): void;
}