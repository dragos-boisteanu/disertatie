<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Stock;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\IngredientCollection;
use App\Http\Requests\IngredientStoreRequest;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingredients = Ingredient::all();

        return new IngredientCollection($ingredients);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IngredientStoreRequest $request)
    {
        $request->user()->can('create', Ingredient::class);

        $stock = Stock::create([
            'quantity' => 1,
        ]);

        $input = $request->validated();
        $input['stock_id'] = $stock->id;

        $ingredient = Ingredient::create($input);

        return $ingredient->id;
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
    public function destroy(Request $request, $id)
    {
        $request->user()->can('delete', Ingredient::class);

        try {
            $ingredient = Ingredient::findOrFail($id);
        
            $ingredient->delete();
    
            return response()->json(['message'=>'Ingredient ' . $ingredient->name . ' was deleted'], 200);
        } catch(\Illuminate\Database\QueryException $e) {
            return response()->json(['message'=>'Ingredient ( ' .  $ingredient->name . ' ) in use by a product'], 500);
        }        
    }
}
