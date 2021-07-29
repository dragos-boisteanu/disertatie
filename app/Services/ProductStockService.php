<?php

namespace App\Services;

use Exception;
use App\Models\Product;
use App\Exceptions\NotInStockException;
use App\Interfaces\ProductStockServiceInterface;

class ProductStockService implements ProductStockServiceInterface
{

  public function removeFromStock(Product $product, int $quantity): void 
  {
    if($product->has_ingredients) {
      //modify ingredients quantity
      foreach($product->ingredients as $ingredient) {
        if($ingredient->stock->quantity >=  $ingredient->pivot->quantity * $quantity) {
          $ingredient->stock->quantity -= $ingredient->pivot->quantity * $quantity;
          $ingredient->stock->save();
        } else {
          throw new  NotInStockException('Cantitatea de  ' . $product->name . ' din stock este insuficienta');
        }
      }
    } else {
      // modify stock quantity
      if( $product->stock->quantity >= $quantity) {
        $product->stock->quantity -= $quantity;
        $product->stock->save();
      } else {
        throw new NotInStockException('Cantitatea de  ' . $product->name . ' din stock este insuficienta');
      }
    }
  }

  public function addBackToStock(Product $product, ?int $quantity = null ): void 
  {
    $quantityToAdd = is_null($quantity) ? $product->pivot->quantity : $quantity;
    if($product->has_ingredients) {
      foreach($product->ingredients as $ingredient) {
        $ingredient->stock->quantity += $ingredient->pivot->quantity * $quantityToAdd;
        $ingredient->stock->save();
      }
    } else {
      $product->stock->quantity += $quantityToAdd;
      $product->stock->save();
    }
  }
}