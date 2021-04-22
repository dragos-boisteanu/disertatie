<?php

namespace App\Http\Controllers\Api\Dashboard;

use Carbon\Carbon;
use App\Models\Stock;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProductCollection;
use App\Http\Requests\ProductPatchRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Resources\Product as ProductResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $query = Product::withTrashed()->filter($request);
        

        if(!$request->has('orderBy')) {
            $orderByValue = 1;
        } else {
            $orderByValue = $request->orderBy;
        }

      
        switch($orderByValue) {
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
        }
        
        $query->orderBy('products.id', 'asc');;

        $products = $query->Paginate(5);

        return new ProductCollection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductStoreRequest $request)
    {   

        $request->user()->can('create', Product::class);

        $input = $request->validated();

        if($request->has('ingredients')) {
            $input['has_ingredients'] = true;
        } else {
            $input['has_ingredients'] = false;
        }

        if($request->has('discount')) {
            $input['discount_id'] = $request->discount['id'];
            $input['discounted_from_date'] = $request->discount['fromDate'];
            $input['discounted_until_date'] = $request->discount['toDate'];
        }

        try {
            DB::beginTransaction();

            $product = Product::create($input);

            if($request->has('ingredients')) {
                foreach($input['ingredients'] as $ingredient) {
                    $product->ingredients()->attach($ingredient['id'], ['quantity' => $ingredient['quantity']]);
                }
            } else {
                $stock = Stock::create(['quantity' => 0]);
                $product->stock_id = $stock->id;
                $product->save();
            }
         

            if($request->has('image')) {
                $requestPath = $request->image;
                $extension = pathinfo(storage_path($requestPath), PATHINFO_EXTENSION);
                $filename = 'image_' . $product->id . '_' . now()->timestamp;
                $newPath = '/public/products_images/' . $product->id . '/' . $filename . '.' . $extension;

                Storage::move($requestPath, $newPath);

                $dbPath = '/storage/products_images/' . $product->id . '/' . $filename . '.' . $extension;
                $product->image = $dbPath;
                $product->save();

                Storage::delete($requestPath);
            }
            
            DB::commit();

            return response()->json([
                'id'=>$product->id
            ]);

        } catch (\Illuminate\Database\QueryException $ex) {
            DB::rollback();
            return $ex;
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
        $product = Product::withTrashed()->findOrFail($id);

        return new ProductResource($product);
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
        $request->user()->can('update');

        $product = Product::withTrashed()->findOrFail($id);

        $product->update($request->validated());

        if($request->has('image')) {

            if($request->image !== 'clear') {
                $requestPath = $request->image;
                $extension = pathinfo(storage_path($requestPath), PATHINFO_EXTENSION);

                Storage::deleteDirectory('/public/products_images' . $product->id);

                $filename = 'image_' . $product->id . '_' . now()->timestamp;
                $newPath = '/public/products_images/' . $product->id . '/' . $filename . '.' . $extension;

                Storage::move($requestPath, $newPath);

                $dbPath = '/storage/products_images/' . $product->id . '/' .$filename . '.' . $extension;
                
                $product->image = $dbPath;

                Storage::delete($requestPath);

                return response()->json(['image'=> $product->image], 200);
                
            } else {
                Storage::deleteDirectory('/public/products_images' . $product->id);
                $product->image = null;
            }

            $product->save();
        }

        if($request->has('ingredients')) {     

            $product->has_ingredients = true;
        
            $ingredientsArray = array();
            
            foreach ($request->ingredients as $ingredient) {
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

        $product->save();

        $product->refresh();
        

        return response()->json(['message'=>'Product updated', ['product'=>$product]], 200);
    }

    public function disable(Request $request, $id) 
    {
        $request->user()->can('delete', Product::class);

        $product = Product::findOrFail($id);

        $product->delete();

        $product->refresh();

        return response()->json(['message'=>'Product disabled', 'deleted_at'=>$product->deleted_at ], 200);
    }

    public function restore(Request $request, $id) 
    {
        $request->user()->can('restore', Product::class);

        $product = Product::withTrashed()->findOrFail($id);

        $product->restore();

        $product->refresh();

        return response()->json(['message'=>'Product restored', 'deleted_at'=>$product->deleted_at ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $request->user()->can('forceDelete', Product::class);

        $product = Product::withTrashed()->findOrFail($id);

        $product->forceDelete();

        return response()->json(['message'=>'Product ' . $product->name . ' deleted'], 200);
    }


    public function getProductByBarcode($barcode) 
    {
        try {
            $product = Product::withTrashed()->where('barcode', $barcode)->with('stock')->first();
            if(!isset($product)) {
                throw new ModelNotFoundException('No products for ' . $barcode . ' barcode');
            }
            return new ProductResource($product);
        } catch ( ModelNotFoundException $ex) {
            response()->json(['message' => $ex->getMessage()], 200);
        }
       
    }
}
