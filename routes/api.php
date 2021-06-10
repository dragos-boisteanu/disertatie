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
    Route::apiResource('roles', 'RoleController');
    Route::apiResource('products', 'ProductController');
    Route::apiResource('categories', 'CategoryController')->except('show');
    Route::apiResource('units', 'UnitController');
    Route::apiResource('ingredients', 'IngredientController');
    Route::apiResource('stocks', 'StockController')->only('update');
    Route::apiResource('discounts', 'DiscountController');
    Route::apiResource('orders', 'OrderController');
    Route::apiResource('delivery-methods', 'DeliveryMethodController');
    // Route::apiResource('order-statuses', 'OrderStatusController');
    Route::apiResource('tables', 'TableController');

    Route::get('products/{id}/edit', 'ProductController@edit');

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
        Route::get('ingredients/{input}', 'StockController@getIngredientStockDetails');
    });

    Route::group(['prefix'=>'discounts'], function() {
        Route::delete('{id}/disable', 'DiscountController@disable');
        Route::post('{id}/restore', 'DiscountController@restore');
    });

    Route::group(['prefix'=>'orders'], function() {
        Route::delete('{id}/disable', 'OrderController@disable');
        // Route::post('{id}/restore', 'OrderController@restore');

        Route::get('products/name/{name}', 'OrderItemController@getProductsByName');
        Route::get('products/id/{id}', 'OrderItemController@getProductsById');

        Route::patch('update-status/{orderId}', 'OrderController@updateStatus');

        Route::patch('remove-item/{orderId}', 'OrderItemController@removeItem');
        Route::patch('add-item/{orderId}', 'OrderItemController@addItem');
        Route::patch('patch-item/{orderId}', 'OrderItemController@patchItem');
    });

    Route::group(['prefix'=>'tables'], function() {
        Route::delete('{id}/disable', 'TableController@disable');
        Route::post('{id}/restore', 'TableController@restore');
    });

    Route::group(['prefix'=>'statuses'], function() {
        Route::get('/orders', 'StatusesController@getOrdersStatuses');
        Route::get('/tables', 'StatusesController@getTableStatuses');
    });

    Route::group(['prefix'=>'clients'], function() {
        Route::get('phone-number/{phoneNumber}', 'ClientController@getClientByPhoneNumer');
        Route::get('addresses/{id}', 'ClientController@getClientAddresses');
    });

    Route::apiResource('images', 'FileController')->only('store', 'destroy');
       
});


