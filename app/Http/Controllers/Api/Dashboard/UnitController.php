<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Unit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UnitController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$units = Unit::all();

		return $units;
	}
}
