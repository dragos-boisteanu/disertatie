<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductOrder;
use Facade\FlareClient\Http\Response;
use App\Http\Resources\ProductOrderCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
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
    public function store(Request $request)
    {
        //
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

    public function getProductsByName($name)
    {
        try {
            $products = Product::where('name', 'like', $name . '%')->get();
            if(count($products) == 0) {
                throw new ModelNotFoundException('No products for ' . $name . ' name');
            }
            return new ProductOrderCollection($products);
        } catch ( ModelNotFoundException $ex) {
            return response()->json(null, 404);
        }
    }

    public function getProductsById($id)
    {
        $product = Product::findOrFail($id);

        return new ProductOrder($product);
    }
}
