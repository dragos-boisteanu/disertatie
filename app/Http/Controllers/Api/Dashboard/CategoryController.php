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
use Illuminate\Support\Facades\Storage;
use App\Interfaces\ImageServiceInterface;
use App\Http\Resources\CategoryCollection;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use Illuminate\Auth\Access\AuthorizationException;
use App\Http\Resources\Category as CategoryResrouce;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryController extends Controller
{

	private $imageService;

	public function __construct(ImageServiceInterface $imageService)
	{
		$this->imageService = $imageService;
	}
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
			$this->authorize('create', Category::class);

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
			$storagePath = '/categories_image/' . $category->id;
			$this->imageService->storeImage($request->image, $storagePath, 'categories', 'image', $category->id);
			$category->refresh();

			debug(new CategoryResrouce($category));

			$response['message'] = 'Category ' . $category->name . ' created sucessfuly';
			$response['category'] = new CategoryResrouce($category);

			Cache::forget('categories');

			return response()->json($response, 201);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (QueryException $qex) {
			dd($qex);
			$errorCode = $qex->errorInfo[1];
			if ($errorCode == 1062) {
				return response()->json(['message' => 'Category already exists'], 500);
			}
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		} catch (\Exception $ex) {
			dd($ex);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
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

		try {
			$this->authorize('update', Category::class);

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
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $e) {
			DB::rollBack();
			debug($e);
			return response()->json(['message' => 'Category not found'], 500);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{

		try {
			$this->authorize('forceDelete', Category::class);

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

			$storagePath = '/categories_images/' . $id;
			Storage::deleteDirectory($storagePath);

			$category->forceDelete();

			DB::commit();

			return response()->json(['message' => 'Category ' . $category->name . ' was deleted'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $e) {
			return response()->json(['message' => 'Category not found'], 404);
		} catch (\Illuminate\Database\QueryException $e) {
			DB::rollBack();
			debug($e);
			return response()->json(['message' => 'Remove or copy category\'s ( ' .  $category->name . ' ) items before deleting'], 500);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}

	public function disable($id)
	{
		try {
			$this->authorize('disable', Category::class);

			$category = Category::withTrashed()->findOrFail($id);

			$category->delete();
			return response()->json(['message' => 'Category ' . $category->name . ' was disabled', 'deletedAt' => $category->deleted_at], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $e) {
			return response()->json(['message' => 'Category not found'], 404);
		} catch (Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}

	public function restore($id)
	{
		try {
			$this->authorize('restore', Category::class);

			$category = Category::withTrashed()->findOrFail($id);

			$category->restore();

			Cache::forget('categories');

			return response()->json(['message' => 'Category ' . $category->name . ' was restored'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $e) {
			return response()->json(['message' => 'Category not found'], 404);
		} catch (Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
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
			$this->authorize('update', Category::class);

			$category = Category::withTrashed()->findOrFail($id);

			$category->parent_id = null;

			$category->position =  $this->getLastPosition() + 1;

			$category->save();

			return response()->json(['message' => 'Parent category removed', 'position' => $category->position], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $mnfe) {
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
