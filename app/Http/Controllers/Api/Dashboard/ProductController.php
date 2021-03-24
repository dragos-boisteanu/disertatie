<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Stock;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
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
    public function index()
    {
        //
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
            
            $product = Product::create($input);

            Stock::create(['quantity' => 1, 'product_id' => $product->id]);
           
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
