<?php


namespace App\Filters\Product;

use App\Filters\IdFilter;
use App\Filters\NameFilter;
use App\Filters\StatusFilter;
use App\Filters\AbstractFilter;
use App\Filters\Product\BarcodeFilter;
use App\Filters\Product\PriceEndFilter;
use App\Filters\Stock\QuantityEndFilter;
use App\Filters\Product\PriceStartFilter;
use App\Filters\Stock\QuantityStartFilter;

class ProductFilter extends AbstractFilter
{
   protected $filters = [
      'id' => IdFilter::class,
      'name' => NameFilter::class,
      'barcode' => BarcodeFilter::class,
      'status' => StatusFilter::class,
      'categories' => CategoryFilter::class,
      'priceStart' => PriceStartFilter::class,
      'priceEnd' => PriceEndFilter::class,
      'quantityStart' => QuantityStartFilter::class,
      'quantityEnd' => QuantityEndFilter::class,
   ];
}