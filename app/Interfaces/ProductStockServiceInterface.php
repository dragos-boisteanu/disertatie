<?php 

namespace App\Interfaces;

use App\Models\Product;

interface ProductStockServiceInterface
{
  public function removeFromStock(Product $product, int $quantity): void;
  public function addBackToStock(Product $product, ?int $quantity = null): void;
}