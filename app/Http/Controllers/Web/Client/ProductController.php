<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function show($categorySlug, $subCategorySlug, $productSlug) 
    {
        $product = Product::findBySlugOrFail($productSlug);
        

        return view('store.product', compact('product'));
    }
}
