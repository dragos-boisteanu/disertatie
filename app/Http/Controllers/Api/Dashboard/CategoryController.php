<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;
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
        $categories = Category::with('products', 'subProducts', 'subCategories')->get();

        return new CategoryCollection($categories);
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

        $input = $request->validated();

        $response = [];

        if($request->has('discountId')) {
            $input['discount_id'] = $request->discountId;
        }

        if($request->has('parentId')) {
            $input['parent_id'] = $request->parentId;
            $parentCategory = Category::findOrFail($request->parentId);
            $input['vat'] = $parentCategory->vat;

            $response['vat'] = $parentCategory->vat;
            $response['parentName'] = $parentCategory->name;
        }

        $category = Category::create($input);

        $response['id'] = $category->id;

        return response()->json($response, 201);
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

        $category = Category::findOrFail($id);

        $input = $request->validated();

        $responseData = null;

        if($request->has('discountId')) {
            $input['discount_id'] = $request->discountId;
        } else if( !$request->has('discountId') && !is_null($category->discount_id)){
            $input['discount_id'] = null;
        }

        if($request->has('parentId')) {
            $input['parent_id'] = $request->parentId;
            $parentCategory = Category::findOrFail($request->parentId);
            $responseData['parentName'] = $parentCategory->name;
        }

        $category->update($input);

        return response()->json($responseData, 200);
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

    public function search($catagoryName) 
    {
        $categories = Category::where('name', 'like', '%' . $catagoryName . '%')->get();
        if($categories->isNotEmpty()) {
            return response()->json(['categories'=>$categories], 200);
        }

        return response()->json(null, 404);
    }
}
