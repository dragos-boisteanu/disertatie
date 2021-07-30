<?php

namespace App\Http\Controllers\Api\Dashboard;

use Exception;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryDiscountController extends Controller
{
	public function addDiscount(Request $request, $id, $discountId)
	{
		try {
			$category = Category::withTrashed()->findOrFail($id);
			$category->discount_id = $discountId;
			$category->save();

			return response()->json(['message' => 'Discount added'], 200);
		} catch (ModelNotFoundException $ex) {
			return response()->json(['message' => 'No category found'], 404);
		} catch (Exception $e) {
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}

	public function removeDiscount(Request $request, $id)
	{
		try {
			$category = Category::withTrashed()->with('discount')->findOrFail($id);
			$category->discount_id = null;
			$category->save();

			return response()->json(['message' => 'Discount removed'], 200);
		} catch (ModelNotFoundException $ex) {
			return response()->json(['message' => 'No category found'], 404);
		} catch (Exception $e) {
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}
}
