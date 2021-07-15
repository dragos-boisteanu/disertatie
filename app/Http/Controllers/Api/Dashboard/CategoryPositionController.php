<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class CategoryPositionController extends Controller
{
    // private $categoryService;

    // public function __construct(CategoryServiceInterface $categoryService)
    // {

    // }

    public function updatePosition(Request $request)
    {
        try {
            DB::beginTransaction();
            $selectedCategory = Category::withTrashed()->findOrFail($request->categoryId);
            $targetCategory = Category::withTrashed()->findOrFail($request->targetCategoryId);

            $initialCategoryPosition = $selectedCategory->position;
            $targetCategoryInitialPosition = $targetCategory->position;

            if (abs($initialCategoryPosition - $targetCategoryInitialPosition) != 1) {
                $query = Category::where('id', '!=', $selectedCategory->id)->where('id', '!=', $targetCategory->id)->whereNull('parent_id');

                if ($initialCategoryPosition > $targetCategoryInitialPosition) {
                    $query->whereBetween('position', [$targetCategoryInitialPosition, $initialCategoryPosition]);
                    // moving from bottom to top
                } else {
                    $query->whereBetween('position', [$initialCategoryPosition, $targetCategoryInitialPosition]);
                    // moving from top to bottom
                }

                $categoriesList =  $query->get();

                if ($categoriesList->count()) {
                    if ($initialCategoryPosition > $targetCategoryInitialPosition) {
                        // moving from bottom to top
                        foreach ($categoriesList as $category) {
                            $category->position += 1;
                            $category->save();
                        }
                    } else {
                        // moving from top to bottom
                        foreach ($categoriesList as $category) {
                            $category->position -= 1;
                            $category->save();
                        }
                    }
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
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to change position'], 500);
        }
    }

     // direction
    // 1 - up
    // 0 - down
    public function updateSubCategoryPosition($id, $direction)
    {
        try {
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
            return response()->json(['message' => 'Category ' . $category->name .  ' moved ' . $directionMessage], 200);
        } catch (\Exception $ex) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to move category up'], 500);
        }
    }
}
