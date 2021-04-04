<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        return $categories;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryStoreRequest $request)
    {
        $request->user()->can('create', Category::class);

        $category = Category::create($request->validated());

        return $category->id;
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
    public function update(CategoryUpdateRequest $request, $id)
    {
        $request->user()->can('update', Category::class);

        Category::findOrFail($id)->update($request->validated());

        return response()->json(['message' => 'Category updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        
        $request->user()->can('forceDelete', Category::class);
        
        try {
            $category = Category::findOrFail($id);
        
            $category->delete();
    
            return response()->json(['message'=>'Category ' . $category->name . ' was deleted'], 200);
        } catch(\Illuminate\Database\QueryException $e) {
            return response()->json(['message'=>'Remove or copy category\'s ( ' .  $category->name . ' ) items before deleting'], 500);
        }
       
    }
}
