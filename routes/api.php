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
    
    Route::get('users/logged-user', 'UserController@getLoggedUser');
     
    Route::apiResource('users', 'UserController');
    Route::apiResource('roles', 'RoleController')->only('index', 'store', 'update', 'destroy');;
    Route::apiResource('products', 'ProductController');
    Route::apiResource('categories', 'CategoryController')->only('index', 'store', 'update', 'destroy');;
    Route::apiResource('units', 'UnitController')->only('index', 'store', 'update', 'destroy');;
    Route::apiResource('ingredients', 'IngredientController')->only('index', 'store', 'update', 'destroy');
    Route::apiResource('stocks', 'StockController')->only('update');
    Route::apiResource('discounts', 'DiscountController')->only('index', 'store', 'update', 'destroy');
   
    Route::group(['prefix'=>'categories'], function() {
        Route::get('/{catagoryName}', 'CategoryController@search');
    });

    Route::group(['prefix'=>'users'], function() {
        Route::delete('{id}/disable', 'UserController@disable');
        Route::post('{id}/restore', 'UserController@restore');
    });
  
    Route::group(['prefix'=>'products'], function() {
        Route::delete('{id}/disable', 'ProductController@disable');
        Route::post('{id}/restore', 'ProductController@restore');
        
        Route::get('/check-barcode/{barcode}', 'ProductController@getProductByBarcode');
    });

    Route::group(['prefix'=>'stocks'], function() {
        Route::get('products/{barcode}', 'StockController@getProductStockDetailsByBarcode');
        Route::get('ingredients/{id}', 'StockController@getIngredientStockDetailsById');
    });

    Route::group(['prefix'=>'discounts'], function() {
        Route::delete('{id}/disable', 'DiscountController@disable');
        Route::post('{id}/restore', 'DiscountController@restore');
    });


    Route::apiResource('images', 'FileController')->only('store', 'destroy');
       
});

Route::group(['namespace'=>'Api\Client', 'prefix'=>'client'], function() {
    Route::get('counties', 'CountyController@index');
    Route::get('cities/{id}','CityController@index');
});

