<?php

namespace App\Http\Controllers\Api\Dashboard;

use Exception;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\QueryException;
use App\Http\Resources\CategoryCollection;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::withTrashed()->with(['products', 'subProducts', 'subCategories' => function ($query) {
            $query->withTrashed();
            $query->orderBy('position', 'asc');
        }])->whereNull('parent_id')->orderBy('position', 'asc')->get();

        return new CategoryCollection($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryStoreRequest $request)
    {
        try {
            $request->user()->can('create', Category::class);

            $input = $request->validated();

            $response = [];

            if ($request->has('discountId')) {
                $input['discount_id'] = $request->discountId;
            }

            if ($request->has('parentId')) {
                $input['parent_id'] = $request->parentId;
                $parentCategory = Category::withTrashed()->findOrFail($request->parentId);

                if ($request->has('vat')) {
                    $input['vat'] = $request->vat;
                    $response['vat'] = $request->vat;
                } else {
                    $input['vat'] = $parentCategory->vat;
                    $response['vat'] = $parentCategory->vat;
                }

                $lastPosition = DB::select('select distinct position from categories
                                            where position is not null
                                            and parent_id IS not null
                                            order by position desc 
                                            limit 1');

                $response['parentName'] = $parentCategory->name;
            } else {
                $lastPosition = DB::select('select position from categories
                                            where position is not null
                                            and parent_id is null
                                            order by position desc 
                                            limit 1');
            }

            $input['position'] = $lastPosition + 1;

            $category = Category::create($input);

            $response['id'] = $category->id;
            $response['message'] = 'Category ' . $category->name . ' created sucessfuly';

            Cache::forget('categories');

            return response()->json($response, 201);
        } catch (QueryException $qex) {
            $errorCode = $qex->errorInfo[1];
            if ($errorCode  == 1062) {
                return response()->json(['error' => 'Category already exists'], 500);
            }
        } catch (\Exception $ex) {
            return response()->json(['error' => 'Something went wrong, try again later'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryUpdateRequest $request, $id)
    {
        $request->user()->can('update', Category::class);

        $category = Category::withTrashed()->findOrFail($id);

        $input = $request->validated();

        $responseData = null;

        if ($request->has('name')) {
            $category->slug = null;
        }

        if ($request->has('discountId')) {
            $input['discount_id'] = $request->discountId;
        }

        if ($request->has('removeDiscount') && $request->removeDiscount) {
            $input['discount_id'] = null;
        }

        if ($request->has('parentId')) {
            $input['parent_id'] = $request->parentId;
            $parentCategory = Category::withTrashed()->findOrFail($request->parentId);
            $responseData['parentName'] = $parentCategory->name;
        }

        $category->update($input);

        $responseData['message'] = "Category updated";

        Cache::forget('categories');

        return response()->json($responseData, 200);
    }

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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $request->user()->can('forceDelete', Category::class);

        try {
            $category = Category::withTrashed()->with('subCategories')->findOrFail($id);

            if ($category->subCategories->count() > 0) {
                foreach ($category->subCategories as $subCategory) {
                    $subCategory->forceDelete();
                }
            }

            $category->forceDelete();


            Cache::forget('categories');

            return response()->json(['message' => 'Category ' . $category->name . ' was deleted'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Remove or copy category\'s ( ' .  $category->name . ' ) items before deleting'], 500);
        }
    }

    public function disable(Request $request, $id)
    {
        $category = Category::withTrashed()->findOrFail($id);

        $category->delete();
        return response()->json(['message' => 'Category ' . $category->name . ' was disabled', 'deletedAt' => $category->deleted_at], 200);
    }

    public function restore(Request $request, $id)
    {
        $category = Category::withTrashed()->findOrFail($id);

        $category->restore();


        Cache::forget('categories');

        return response()->json(['message' => 'Category ' . $category->name . ' was restored'], 200);
    }

    public function search($catagoryName)
    {

        $categories = Category::with(['products', 'subProducts', 'subCategories' => function ($query) {
            $query->withTrashed();
        }])->where('name', 'like', $catagoryName . '%')->whereNull('parent_id')->get();

        if ($categories->isNotEmpty()) {
            return  new CategoryCollection($categories);
            // return response()->json(['categories' => $categories], 200);
        }

        return response()->json(null, 404);
    }
}
