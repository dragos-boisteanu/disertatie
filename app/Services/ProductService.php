<?php

namespace App\Services;

use Exception;
use App\Models\Stock;
use App\Models\Product;
use Illuminate\Support\Carbon;
use Carbon\Carbon as CarbonCarbon;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Storage;
use App\Interfaces\ImageServiceInterface;
use App\Interfaces\ProductServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;

use App\Http\Resources\Product as ProductResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductService implements ProductServiceInterface
{

	private $imageService;

	public function __construct(ImageServiceInterface $imageService)
	{
		$this->imageService = $imageService;
	}

	public function getAll(int $perPage = 8, ?int $orderBy = null, ?array $data = null): LengthAwarePaginator
	{
		try {
			$query = Product::withTrashed()->filter($data);

			switch ($orderBy) {
				case 1:
					$query->orderBy('name', 'asc');
					break;
				case 2:
					$query->orderBy('name', 'desc');
					break;
				case 3:
					$query->orderBy('base_price', 'asc');
					break;
				case 4:
					$query->orderBy('base_price', 'desc');
					break;
				case 5:
					$query->orderBy('quantity', 'asc');
					break;
				case 6:
					$query->orderBy('quantity', 'desc');
					break;
				default:
					$query->orderBy('name', 'asc');
			}

			$query->orderBy('id', 'asc');;

			$products = $query->Paginate($perPage);

			return $products;
		} catch (\Exception $e) {
			throw new Exception('Something went wrong');
		}
	}

	public function getById(int $productId): Product
	{
		try {
			$product = Product::withTrashed()->findOrFail($productId);

			return $product;
		} catch (ModelNotFoundException $mex) {
			throw new Exception('No product found with #' . $productId . ' id');
		} catch (\Exception $ex) {
			throw new \Exception('Something went wrong');
		}
	}

	public function create(array $data): int
	{

		$storagePath = "";
		try {
			DB::beginTransaction();

			$product = new Product();

			$product->barcode = $data['barcode'];
			$product->name = $data['name'];
			$product->description = $data['description'];
			$product->base_price = $data['basePrice'];
			$product->weight = $data['weight'];
			$product->category_id = $data['categoryId'];
			$product->unit_id = $data['unitId'];

			if (array_key_exists('discountId', $data)) {
				$product->discount_id = $data['discountId'];
			}

			if (!empty($data['subCategoryId'])) {
				$product->sub_category_id = $data['subCategoryId'];
			}

			if (array_key_exists('ingredients', $data)) {
				$product->has_ingredients = true;
			} else {
				$product->has_ingredients = false;
			}

			$product->save();

			if (array_key_exists('image', $data)) {
				$storagePath = '/products_images/' . $product->id;
				$path = $this->imageService->storeImage($data['image'], $storagePath, 'products', 'image', $product->id);
			}

			// ingredients or simple stock
			$this->setStock($product, $data);

			DB::commit();

			return $product->id;
		} catch (\Exception $e) {
			DB::rollBack();

			if (isset($storagePath)) {
				Storage::deleteDirectory($storagePath);
			}

			throw new \Exception($e->getMessage());
		}
	}

	public function patch(array $data, int $productId): void
	{
		try {
			$product = Product::withTrashed()->findOrFail($productId);

			if (array_key_exists('barcode', $data)) {
				$product->barcode = $data['barcode'];
			}

			if (array_key_exists('name', $data)) {
				$product->slug = null;
				$product->name = $data['name'];
			}

			if (array_key_exists('description', $data)) {
				$product->description = $data['description'];
			}

			if (array_key_exists('basePrice', $data)) {
				$product->base_price = $data['basePrice'];
			}

			if (array_key_exists('weight', $data)) {
				$product->slug = null;
				$product->weight = $data['weight'];
			}

			if (array_key_exists('categoryId', $data)) {
				$product->category_id = $data['categoryId'];
			}

			if (array_key_exists('subCategoryId', $data)) {
				$product->sub_category_id = $data['subCategoryId'];
			}

			if (array_key_exists('unitId', $data)) {
				$product->slug = null;
				$product->unit_id = $data['unitId'];
			}

			// $this->updateIngredients($product, $data);

			$product->save();
		} catch (ModelNotFoundException $me) {
			throw new ModelNotFoundException('Product with id #' . $productId . ' was not found');
		} catch (\Exception $e) {
			throw new \Exception('Something went wrong');
		}
	}

	public function addDiscount(Product $product, int $discountId): Product
	{
		try {
			$product->discount_id = $discountId;

			return $product;
		} catch (\Exception $ex) {
			throw new Exception('Something went wrong, try again later');
		}
	}

	public function removeDiscount(Product $product): Product
	{
		try {
			$product->discount_id = null;

			return $product;
		} catch (\Exception $ex) {
			throw new Exception('Something went wrong, try again later');
		}
	}

	public function addIngredient(Product $product, int $ingredientId, int $ingredientQuantity): Product
	{
		try {
			$product->has_ingredients = true;

			$product->ingredients()->sync([$ingredientId => ['quantity' => $ingredientQuantity]], false);

			if ($product->stock_id) {
				$product->stock_id = null;
				$product->stock()->delete();
			}
			return $product;
		} catch (\Exception $ex) {
			throw new Exception('Something went wrong, try again later');
		}
	}

	public function removeIngredient(Product $product, int $ingredientId): Product
	{
		try {

			$product->ingredients()->detach($ingredientId);

			$product->load('ingredients');
			if ($product->ingredients->count() == 0) {
				$stock = Stock::create(['quantity' => 0]);
				$product->stock_id = $stock->id;
				$product->has_ingredients = 0;
			}

			return $product;
		} catch (\Exception $ex) {
			throw new Exception('Something went wrong, try again later');
		}
	}
	public function disable(int $productId): Carbon
	{
		try {
			$product = Product::findOrFail($productId);
			$product->delete();
			$product->refresh();

			return $product->deleted_at;
		} catch (ModelNotFoundException $me) {
			throw new ModelNotFoundException('Product with id #' . $productId . ' was not found');
		} catch (\Exception $e) {
			throw new \Exception('Something went wrong');
		}
	}

	public function restore(int $productId): void
	{
		try {
			$product = Product::withTrashed()->findOrFail($productId);
			$product->restore();
			$product->refresh();
		} catch (ModelNotFoundException $me) {
			throw new ModelNotFoundException('Product with id #' . $productId . ' was not found');
		} catch (\Exception $e) {
			throw new \Exception('Something went wrong');
		}
	}

	public function destroy(int $productId): string
	{
		try {
			$product = Product::withTrashed()->findOrFail($productId);
			$product->forceDelete();

			return $product->name;
		} catch (ModelNotFoundException $me) {
			throw new ModelNotFoundException('Product with id #' . $productId . ' was not found');
		} catch (\Exception $e) {
			throw new \Exception('Something went wrong');
		}
	}

	private function setStock(Product $product, array $data): void
	{
		if (array_key_exists('ingredients', $data)) {
			$data['ingredients'] = json_decode($data['ingredients']);
			foreach ($data['ingredients'] as $ingredient) {
				$product->ingredients()->attach($ingredient->id, ['quantity' => $ingredient->quantity]);
			}
		} else {
			$stock = Stock::create(['quantity' => 0]);
			$product->stock_id = $stock->id;
			$product->save();
		}
	}
}
