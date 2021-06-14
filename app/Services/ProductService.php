<?php

namespace App\Services;

use Exception;
use App\Models\Stock;
use App\Models\Product;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Interfaces\ProductServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\Product as ProductResource;
use Carbon\Carbon as CarbonCarbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductService implements ProductServiceInterface
{

  public function getAll(int $perPage = 8, ?int $orderBy = null, ?array $data = null): LengthAwarePaginator
  {
    try {
      $query = Product::withTrashed()->filter($data);
  
      switch($orderBy) {
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
  
    } catch ( \Exception $e) {
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
    } catch ( \Exception $ex) {
      throw new \Exception('Something went wrong');
    }
  }

  public function create(array $data): int
  {
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

      if(array_key_exists('discountId', $data)) {
        $product->discount_id = $data['discountId'];
      }
      
      if(array_key_exists('subCategoryId', $data)) {
        $product->sub_category_id = $data['subCategoryId'];
      }

      if(array_key_exists('image', $data)) {
        $this->setImage($product, $data['image']);
      }

      if(array_key_exists('ingredients', $data)) {
        $product->has_ingredients = true;
      } else {
        $product->has_ingredients = false;
      }

      $product->save();

      // ingredients or simple stock
      $this->setStock($product, $data);

      DB::commit();

      return $product->id;

    } catch ( \Exception $e) {
      DB::rollBack();
      throw new \Exception($e->getMessage());
    } 
  }

  public function patch(array $data, int $productId): void
  {
    try {
      $product = Product::withTrashed()->findOrFail($productId);
    
      if(array_key_exists('image', $data)) {
        $product->image = $data['image'];
      } 

      if(array_key_exists('barcode', $data)) {
        $product->barcode = $data['barcode'];
      } 

      if(array_key_exists('name', $data)) {
        $product->name = $data['name'];
      } 

      if(array_key_exists('description', $data)) {
        $product->description = $data['description'];
      } 

      if(array_key_exists('basePrice', $data)) {
        $product->base_price = $data['basePrice'];
      } 

      if(array_key_exists('weight', $data)) {
        $product->weight = $data['weight'];
      } 

      if(array_key_exists('categoryId', $data)) {
        $product->category_id = $data['categoryId'];
      } 

      if(array_key_exists('subCategoryId', $data)) {
        $product->sub_category_id = $data['subCategoryId'];
      } 

      if(array_key_exists('unitId', $data)) {
        $product->unit_id = $data['unitId'];
      } 

      if(array_key_exists('hasIngredients', $data)) {
        $this->updateIngredients($product, $data);
      }       

      $this->updateDiscount($product, $data);

      if(array_key_exists('image', $data)) {
        $this->updateImage($product, $data);
      }

      $product->save();      
    } catch (ModelNotFoundException $me) {
      throw new ModelNotFoundException('Product with id #' . $productId . ' was not found');
    } catch ( \Exception $e) {
      throw new \Exception('Something went wrong');
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
    } catch ( \Exception $e) {
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
    } catch ( \Exception $e) {
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
    } catch ( \Exception $e) {
      throw new \Exception('Something went wrong');
    }
    
  }

  private function setImage(Product $product, string $requestPath): void 
  {
    try {
      $extension = pathinfo(storage_path($requestPath), PATHINFO_EXTENSION);
      $filename = 'image_' . $product->id . '_' . now()->timestamp;
      $newPath = '/public/products_images/' . $product->id . '/' . $filename . '.' . $extension;
  
      Storage::move($requestPath, $newPath);
  
      $dbPath = '/storage/products_images/' . $product->id . '/' . $filename . '.' . $extension;
      $product->image = $dbPath;
      $product->save();
  
      Storage::delete($requestPath);
    } catch ( \Exception $e) {
      throw new \Exception('Failed to add image.');
    }
   
  }

  private function setStock(Product $product, array $data): void
  {
    if(array_key_exists('ingredients', $data)) {
      foreach($data['ingredients'] as $ingredient) {
        $product->ingredients()->attach($ingredient['id'], ['quantity' => $ingredient['quantity']]);
      }
    } else {
      $stock = Stock::create(['quantity' => 0]);
      $product->stock_id = $stock->id;
      $product->save();
    }
  }

  private function updateImage(Product $product, array $data): void
  {
    if($data['image'] !== 'clear') {
      $requestPath = $data['image'];
      $extension = pathinfo(storage_path($requestPath), PATHINFO_EXTENSION);

      Storage::deleteDirectory('/public/products_images' . $product->id);

      $filename = 'image_' . $product->id . '_' . now()->timestamp;
      $newPath = '/public/products_images/' . $product->id . '/' . $filename . '.' . $extension;

      Storage::move($requestPath, $newPath);

      $dbPath = '/storage/products_images/' . $product->id . '/' .$filename . '.' . $extension;
      
      $product->image = $dbPath;

      Storage::delete($requestPath);
        
    } else {
      Storage::deleteDirectory('/public/products_images' . $product->id);
      $product->image = null;
    }

    $product->save();
  }

  private function updateIngredients(Product $product, array $data): void
  {
    if($data['hasIngredients']) {
      $product->has_ingredients = true;
  
      $ingredientsArray = array();
      
      foreach ($data['ingredients'] as $ingredient) {
          $ingredientsArray[$ingredient['id']] = ['quantity' => $ingredient['quantity']];  
      }
  
      $product->ingredients()->sync($ingredientsArray);
          
      if($product->stock_id) {
          $product->stock_id = null;
          $product->stock()->delete();
      }
    } else {
      $product->has_ingredients = false;
      $product->ingredients()->detach();
      $stock = Stock::create([
          'quantity'=> 0,
      ]);
      $product->stock_id = $stock->id;
    }
  }

  private function updateDiscount(Product $product, array $data): void
  {
    if(array_key_exists('discountId', $data)) { 
      $product->discount_id =  $data['discountId'];
    } else if(!array_key_exists('discountId', $data) && !is_null($product->discount_id)) {
      $product->discount_id = null;
    }
    $product->save();
  }
}