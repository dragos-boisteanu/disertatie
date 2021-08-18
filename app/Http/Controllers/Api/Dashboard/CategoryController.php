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
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$categories = Category::withTrashed()->with(['discount', 'products', 'subProducts', 'subCategories' => function ($query) {
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

				$lastPosition = $this->getLastPosition($request->parentId);

				$response['parentName'] = $parentCategory->name;
			} else {
				$lastPosition = $this->getLastPosition();
			}

			$input['position'] = $lastPosition + 1;

			$category = Category::create($input);

			debug($category);

			$response['id'] = $category->id;
			$response['message'] = 'Category ' . $category->name . ' created sucessfuly';
			$response['position'] = $category->position;

			Cache::forget('categories');

			return response()->json($response, 201);
		} catch (QueryException $qex) {
			dd($qex);
			$errorCode = $qex->errorInfo[1];
			if ($errorCode  == 1062) {
				return response()->json(['error' => 'Category already exists'], 500);
			}
		} catch (\Exception $ex) {
			dd($ex);
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

		if ($request->has('parentId')) {
			$input['parent_id'] = $request->parentId;
			$parentCategory = Category::withTrashed()->findOrFail($request->parentId);
			$responseData['parentName'] = $parentCategory->name;
			$lastPosition =  $this->getLastPosition($request->parentId);
		} else {
			$lastPosition =  $this->getLastPosition();
		}

		$input['position'] =  $lastPosition + 1;
		$category->update($input);

		$responseData['message'] = "Category updated";
		$responseData['position'] = $input['position'];

		Cache::forget('categories');

		return response()->json($responseData, 200);
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
			DB::beginTransaction();

			$category = Category::withTrashed()->with('subCategories')->findOrFail($id);

			if ($category->subCategories->count() > 0) {
				foreach ($category->subCategories as $subCategory) {
					$subCategory->forceDelete();
				}
			}

			if (is_null($category->parent_id)) {
				DB::table('categories')->whereNull('parent_id')
					->where('position', '>', $category->position)
					->decrement('position');
			} else {
				DB::table('categories')->where('parent_id', $category->parent_id)
					->where('position', '>', $category->position)
					->decrement('position');
			}

			$category->forceDelete();


			DB::commit();

			return response()->json(['message' => 'Category ' . $category->name . ' was deleted'], 200);
		} catch (\Illuminate\Database\QueryException $e) {
			DB::rollBack();
			debug($e);
			return response()->json(['message' => 'Remove or copy category\'s ( ' .  $category->name . ' ) items before deleting'], 500);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}

	public function disable(Request $request, $id)
	{

		$request->user()->can('disable', Category::class);

		$category = Category::withTrashed()->findOrFail($id);

		$category->delete();
		return response()->json(['message' => 'Category ' . $category->name . ' was disabled', 'deletedAt' => $category->deleted_at], 200);
	}

	public function restore(Request $request, $id)
	{
		$request->user()->can('restore', Category::class);

		$category = Category::withTrashed()->findOrFail($id);

		$category->restore();


		Cache::forget('categories');

		return response()->json(['message' => 'Category ' . $category->name . ' was restored'], 200);
	}

	public function search($catagoryName)
	{

		$categories = Category::with(['discount', 'products', 'subProducts', 'subCategories' => function ($query) {
			$query->withTrashed();
			$query->orderBy('position', 'asc');
		}])->where('name', 'like', $catagoryName . '%')->whereNull('parent_id')->get();

		if ($categories->isNotEmpty()) {
			return  new CategoryCollection($categories);
			// return response()->json(['categories' => $categories], 200);
		}

		return response()->json(null, 404);
	}

	public function removeParent($id)
	{
		try {
			$category = Category::withTrashed()->findOrFail($id);

			$category->parent_id = null;

			$category->position =  $this->getLastPosition() + 1;

			$category->save();

			return response()->json(['message' => 'Parent category removed', 'position' => $category->position], 200);
		} catch (ModelNotFoundException $mnfe) {
			debug($mnfe);
			return response()->json(['message' => 'Category not found'], 404);
		} catch (\Exception $e) {
			debug($e);
			return response()->json(['message' => 'Failed to remove parent category'], 500);
		}
	}


	private function getLastPosition(?int $parentId = null): int
	{
		$query = DB::table('categories')
			->whereNotNull('position');

		if (isset($parentId)) {
			$query->where('parent_id', $parentId);
		} else {
			$query->whereNull('parent_id');
		}

		$lastPosition = $query->orderBy('position', 'desc')->first(['position']);

		if (isset($lastPosition)) {
			$lastPosition = $lastPosition->position;
		} else {
			$lastPosition = 0;
		}

		debug($lastPosition);

		return $lastPosition;
	}
}
