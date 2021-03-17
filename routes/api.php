<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware'=>'auth:sanctum', 'namespace'=>'Api\Dashboard', 'prefix'=>'dashboard'], function() {   
    Route::apiResource('users', 'UserController');
    Route::apiResource('roles', 'RoleController');
    // Route::get('/users', 'UserController@index');
    // Route::get('/users/{id}', 'UserController@show');
});

Route::group(['namespace'=>'Api\Client', 'prefix'=>'client'], function() {
    Route::get('counties', 'CountyController@index');
    Route::get('cities/{id}','CityController@index');
});

