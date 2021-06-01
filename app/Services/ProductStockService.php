<?php

namespace App\Services;

use Exception;
use App\Models\Product;
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
          throw new  Exception('There are not enought ' . $product->name . ' in stock');
        }
      }
    } else {
      // modify stock quantity
      if( $product->stock->quantity >= $quantity) {
        $product->stock->quantity -= $quantity;
        $product->stock->save();
      } else {
        throw new  Exception('There are not enought ' . $product->name . ' in stock');
      }
    }
  }

  public function addBackToStock(Product $product, ?int $quantity = null ): void 
  {
    $quantityToAdd = is_null($quantity) ? $this->pivot->quantity : $quantity;
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