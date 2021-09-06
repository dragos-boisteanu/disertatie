<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Auth\Access\AuthorizationException;

class CategoryPositionController extends Controller
{

	public function updatePosition(Request $request)
	{
		try {
			$this->authorize('update', Category::class);

			DB::beginTransaction();
			$selectedCategory = Category::withTrashed()->findOrFail($request->categoryId);
			$targetCategory = Category::withTrashed()->findOrFail($request->targetCategoryId);

			$initialCategoryPosition = $selectedCategory->position;
			$targetCategoryInitialPosition = $targetCategory->position;

			if (abs($initialCategoryPosition - $targetCategoryInitialPosition) != 1) {
				$query = Category::withTrashed()->where('id', '!=', $selectedCategory->id)
					->where('id', '!=', $targetCategory->id)
					->whereNull('parent_id');

				if ($initialCategoryPosition > $targetCategoryInitialPosition) {
					$query->whereBetween('position', [$targetCategoryInitialPosition, $initialCategoryPosition]);
					$query->increment('position');
					// moving from bottom to top
				} else {
					$query->whereBetween('position', [$initialCategoryPosition, $targetCategoryInitialPosition]);

					$query->decrement('position');
					// moving from top to bottom
				}
			}

			$selectedCategory->position = $targetCategory->position;

			if ($targetCategory->position > $initialCategoryPosition) {
				$targetCategory->position -= 1;
			} else {
				$targetCategory->position += 1;
			}

			$selectedCategory->save();
			$targetCategory->save();

			Cache::forget('categories');

			DB::commit();
			return response()->json(['message' => 'Positon changed succesfull'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $e) {
			DB::rollBack();
			debug($e->getMessage());
			return response()->json(['message' => 'Failed to change position'], 500);
		}
	}

	// direction
	// 1 - up
	// 0 - down
	public function updateSubCategoryPosition($id, $direction)
	{
		try {
			$this->authorize('update', Category::class);

			DB::beginTransaction();

			$category = Category::withTrashed()->findOrFail($id);

			$directionMessage = "";

			if ($direction == 1) {
				$aboveCategory = Category::withTrashed()->where('parent_id', $category->parent_id)->where('position', '<', $category->position)->orderBy('position', 'desc')->first();

				$initialCategoryPosition = $category->position;

				$category->position = $aboveCategory->position;

				$aboveCategory->position = $initialCategoryPosition;

				$directionMessage = 'up';

				$aboveCategory->save();
			} else {
				$bellowCategory = Category::withTrashed()->where('parent_id', $category->parent_id)->where('position', '>', $category->position)->orderBy('position', 'asc')->first();

				$initialCategoryPosition = $category->position;

				$category->position = $bellowCategory->position;

				$bellowCategory->position = $initialCategoryPosition;

				$directionMessage = 'down';

				$bellowCategory->save();
			}

			$category->save();

			Cache::forget('categories');

			DB::commit();
			return response()->json(['message' => 'Category ' . $category->name .  ' moved ' . $directionMessage, 'position' => $category->position], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $ex) {
			DB::rollBack();
			return response()->json(['message' => 'Failed to move category up'], 500);
		}
	}
}
