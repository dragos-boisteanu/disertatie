<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Interfaces\ProductServiceInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductIngredientController extends Controller
{
    private $productService;

    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }


    public function addIngredient(Request $request, $id, $ingredientId, $ingredientQuantity)
    {
        $request->user()->can('update');
        
        try {
            $product = Product::withTrashed()->findOrFail($id);

            $product = $this->productService->addIngredient($product, $ingredientId, $ingredientQuantity);

            $product->save();
            return response()->json(['message'=>'Ingredient added'], 200);
        } catch (ModelNotFoundException $me) {
            return  response()->json(['message'=>$me->getMessage()], 404);
        } catch (\Exception $e) {
            return  response()->json(['message'=>$e->getMessage()], 500);
        }    
    }
}
