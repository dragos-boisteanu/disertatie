<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\CartServiceInterface;

class MenuController extends Controller
{

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::where('parent_id', null)->orderBy('position', 'asc')->get();
     
        return view('store.menu.index', ['categories'=>$categories]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($categorySlug)
    {
        $categories = Category::where('parent_id', null)->orderBy('position', 'asc')->get();
        $category = Category::findBySlugOrFail($categorySlug);
        $category->load('subCategories');
        $category->subCategories->each( function($subCategory) {
            $subCategory->load('subProducts');
        });

        return view('store.menu.category', ['category'=>$category, 'categories' => $categories]);
    }

}
