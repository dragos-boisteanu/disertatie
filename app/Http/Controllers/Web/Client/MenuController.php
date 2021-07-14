<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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

        return view('store.menu.index', ['categories' => $categories]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($categorySlug)
    {
        $categories = Cache::remember('categories', 60 * 30, function () {
            return  Category::where('parent_id', null)->orderBy('position', 'asc')->get();
        });
        
        $category =  Category::with(
            [
                'subCategories' => function ($query) {
                    $query->orderBy('position', 'asc');
                    $query->with([
                        'subProducts' => function ($query) {
                            $query->orderBy('name', 'asc');
                        },
                    ]);
                },
            ]
        )->whereSlug($categorySlug)->first();

        return view('store.menu.category', ['category' => $category, 'categories' => $categories]);
    }
}
