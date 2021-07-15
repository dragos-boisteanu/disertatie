<?php

namespace App\Http\Controllers\Api\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Interfaces\ProductServiceInterface;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductDiscountController extends Controller
{
    private $productService;


    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }

    public function addDiscount(Request $request, int $id, int $discountId)
    {
        $request->user()->can('update');

        try {

            $product = Product::withTrashed()->findOrFail($id);

            $product = $this->productService->addDiscount($product, $discountId);

            return response()->json(['message' => 'Discount added'], 200);
        } catch (ModelNotFoundException $me) {
            return  response()->json(['message' => $me->getMessage()], 404);
        } catch (\Exception $e) {
            return  response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function removeDiscount(Request $request, int $id)
    {
        $request->user()->can('update');

        try {
            $product = Product::withTrashed()->findOrFail($id);

            $product = $this->productService->removeDiscount($product);

            $product->save();

            return response()->json(['message' => 'Discount removed'], 200);
        } catch (ModelNotFoundException $me) {
            return  response()->json(['message' => $me->getMessage()], 404);
        } catch (\Exception $e) {
            return  response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
