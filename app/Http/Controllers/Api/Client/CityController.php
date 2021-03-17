<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\CityCollection;
use App\Models\City;

class CityController extends Controller
{
    public function index($id)
    {
        $cities = City::where('county_id', $id)->get();
        return new CityCollection($cities);
    }
}
