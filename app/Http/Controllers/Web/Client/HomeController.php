<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
	/**
	 * Handle the incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function __invoke(Request $request)
	{
		$categories = Category::orderBy('position', 'asc')->get(['id', 'slug', 'name']);
		return view('home', compact('categories'));
	}
}
