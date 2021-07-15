<?php

namespace App\Interfaces;

use Carbon\Carbon;
use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;
use phpDocumentor\Reflection\Types\Null_;

interface ProductServiceInterface
{
  public function getById(int $productId): Product;
  public function getAll(int $perPage = 8, ?int $orderBy = null, ?array $data = null): LengthAwarePaginator;
  public function create(array $data): int;

  public function patch(array $data, int $productId): void;

  public function addDiscount(Product $product, int $discountId): Product;
  public function removeDiscount(Product $product): Product;

  public function addIngredient(Product $product, int $ingredientId, int $ingredientQuantity): Product;
  public function removeIngredient(Product $product, int $ingredientId): Product;

  public function disable(int $productId): Carbon;
  public function restore(int $productId): void;
  public function destroy(int $productId): string;
  
}