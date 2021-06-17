<?php

namespace App\Interfaces;

use App\Models\Product;
use Carbon\Traits\Date;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

interface OrderItemServiceInterface 
{
  public function getProductsByName(string $productName): Collection;
  public function getProductsById(int $productId): Product;

  public function removeFromOrder(int $itemId, int $orderId): Carbon;
  public function addItemToOrder(array $item, int $orderId): array;

  public function patchOrderItem(array $data, int $orderId): array;
}