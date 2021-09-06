<?php

namespace App\Http\Controllers\Api\Dashboard;

use Exception;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Interfaces\ProductServiceInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductDiscountController extends Controller
{
	private $productService;


	public function __construct(ProductServiceInterface $productService)
	{
		$this->productService = $productService;
	}

	public function addDiscount(int $id, int $discountId)
	{

		try {
			$this->authorize('update', Product::class);
			$product = Product::withTrashed()->findOrFail($id);

			$product = $this->productService->addDiscount($product, $discountId);

			$product->save();
			return response()->json(['message' => 'Discount added'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => $me->getMessage()], 404);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}

	public function removeDiscount(int $id)
	{

		try {
			$this->authorize('update', Product::class);

			$product = Product::withTrashed()->findOrFail($id);

			$product = $this->productService->removeDiscount($product);

			$product->save();

			return response()->json(['message' => 'Discount removed'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => $me->getMessage()], 404);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}
}
