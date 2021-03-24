<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Stock;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
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
        $query = Product::filter($request);

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
        
        $query->orderBy('id', 'asc');;

        $products = $query->Paginate(1);

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
        $input = $request->validated();

        try {
            DB::beginTransaction();

            $product = Product::where('barcode', $input['barcode'])->with('stock')->first();

            if(isset($product)) {;
                $product->stock->increment('quantity');
                DB::commit();
                return response()->json([
                    'message'=>'Product already exists. Stock quantity increased by 1',
                ], 200);
            } 
            
            $stock = Stock::create(['quantity' => 1]);

            $input['stock_id'] = $stock->id;

            $product = Product::create($input);

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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getProductByBarcode($barcode) 
    {
        try {
            $product = Product::where('barcode', $barcode)->with('stock')->first();
            if(!isset($product)) {
                throw new ModelNotFoundException('No products for ' . $barcode . ' barcode');
            }
            return new ProductResource($product);
        } catch ( ModelNotFoundException $ex) {
            response()->json(null, 200);
        }
       
    }
}
