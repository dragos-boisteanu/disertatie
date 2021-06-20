<?php

namespace App\Http\Controllers\Web\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        return view('store.menu.index', ['categories'=>$categories]);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categories = Category::all();
        $category = Category::with('subCategories')->findOrFail($id);

        $category->subCategories->each( function($subCategory) {
            $subCategory->load('subProducts');
        });

        return view('store.menu.category', ['category'=>$category, 'categories' => $categories]);
    }

}
