<?php


namespace App\Filters\Product;

use App\Filters\IdFilter;
use App\Filters\NameFilter;
use App\Filters\StatusFilter;
use App\Filters\AbstractFilter;
use App\Filters\Product\BarcodeFilter;
use App\Filters\Product\PriceEndFilter;
use App\Filters\Product\SubCategoryFilter;
use App\Filters\Product\PriceStartFilter;

class ProductFilter extends AbstractFilter
{
   protected $filters = [
      'id' => IdFilter::class,
      'name' => NameFilter::class,
      'barcode' => BarcodeFilter::class,
      'status' => StatusFilter::class,
      'priceStart' => PriceStartFilter::class,
      'priceEnd' => PriceEndFilter::class,
      'categories' => CategoryFilter::class,
      'subCategories' => SubCategoryFilter::class,
   ];
}