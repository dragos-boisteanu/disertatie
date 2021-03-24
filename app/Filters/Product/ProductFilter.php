<?php


namespace App\Filters\Product;

use App\Filters\IdFilter;
use App\Filters\NameFilter;
use App\Filters\AbstractFilter;


class ProductFilter extends AbstractFilter
{
   protected $filters = [
      'id' => IdFilter::class,
      'name' => NameFilter::class,
      'barcode' => BarcodeFilter::class,
      'status' => StatusFilter::class,
   ];
}