<?php

namespace App\Http\Controllers\Api\Client;

use App\Models\County;
use App\Http\Controllers\Controller;
use App\Http\Resources\CountyCollection;

class CountyController extends Controller
{
    public function index()
    {
        $counties = County::all();

        return new CountyCollection($counties);
    }
}
