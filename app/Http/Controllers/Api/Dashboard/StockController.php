<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use App\Models\Product;
use Illuminate\Http\Request;

class StockController extends Controller
{

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
        $request->user()->can('update', Stock::class);
        
        $quantity = 0;
        
        if($request->type === 'product') {
            $product = Product::findOrFail($id);
            $product->stock->quantity += $request->newQuantity;
            $quantity = $product->stock->quantity;
            $product->stock->save();
        } else {
            $ingredient = Ingredient::findOrFail($id);
            $ingredient->stock->quantity += $request->newQuantity;
            $quantity = $ingredient->stock->quantity;
            $ingredient->stock->save();
        } 
        
        return response()->json(['message'=>'Stock updated', 'quantity'=>$quantity], 200);
    }
}
