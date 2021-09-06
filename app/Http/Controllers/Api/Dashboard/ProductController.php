<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Stock;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ProductEdit;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderProduct;
use App\Http\Resources\ProductOrder;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProductCollection;
use App\Http\Requests\ProductPatchRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Interfaces\ProductServiceInterface;
use App\Http\Resources\ProductOrderCollection;
use App\Http\Resources\Product as ProductResource;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{

	private $productService;

	public function __construct(ProductServiceInterface $productService)
	{
		$this->productService = $productService;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		try {
			$products = $this->productService->getAll(5, $request->orderBy, $request->all());
			return new ProductCollection($products);
		} catch (\Exception $ex) {
			return response()->json($ex->getMessage(), 500);
		}
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(ProductStoreRequest $request)
	{
		$this->authorize('create', Product::class);

		try {
			$productId = $this->productService->create($request->validated());
			return response()->json(['id' => $productId, 'message' => 'Produsul a fost adaugat'], 201);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 400);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$product = $this->productService->getById($id);

		return new ProductResource($product);
	}

	public function edit($id)
	{
		try {
			$this->authorize('update', Product::class);

			$product = $this->productService->getById($id);

			return new ProductEdit($product);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $e) {
			return  response()->json(['message' => $e->getMessage()], 404);
		} catch (\Exception $e) {
			return response()->json($e->getMessage(), 500);
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(ProductPatchRequest $request, $id)
	{
		$this->authorize('update', Product::class);

		try {
			$this->productService->patch($request->validated(), $id);

			return response()->json(['message' => 'Product updated'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => $me->getMessage()], 404);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}

	public function disable($id)
	{
		$this->authorize('delete', Product::class);

		try {
			$deletedAt = $this->productService->disable($id);
			return response()->json(['message' => 'Product disabled', 'deleted_at' => $deletedAt], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => $me->getMessage()], 404);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}

	public function restore(Request $request, $id)
	{

		try {
			$this->authorize('restore', Product::class);
			$this->productService->restore($id);
			return response()->json(['message' => 'Product restored', 'deleted_at' => null], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => $me->getMessage()], 404);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
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
		$this->authorize('forceDelete', Product::class);

		try {
			$productName = $this->productService->destroy($id);
			return response()->json(['message' => 'Product ' . $productName . ' deleted'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (ModelNotFoundException $me) {
			return  response()->json(['message' => $me->getMessage()], 404);
		} catch (\Exception $e) {
			return  response()->json(['message' => $e->getMessage()], 500);
		}
	}


	public function getProductByBarcode($barcode)
	{
		$product = Product::withTrashed()->where('barcode', $barcode)->firstOrFail();

		return [
			'id' => $product->id,
			'name' => $product->name,
			'quantity' => 1,
			'price' => $product->price
		];
	}
}
