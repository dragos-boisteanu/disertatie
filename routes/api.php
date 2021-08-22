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

Route::group(['middleware' => 'auth:sanctum', 'namespace' => 'Api\Dashboard', 'prefix' => 'dashboard'], function () {

	Route::get('users/logged-user', 'UserController@getLoggedUser');

	Route::group(['prefix' => 'categories'], function () {
		Route::get('/{catagoryName}', 'CategoryController@search');
		Route::delete('/{id}/disable', 'CategoryController@disable');
		Route::post('/{id}/restore', 'CategoryController@restore');
		Route::patch('/position/{id}/{direction}', 'CategoryPositionController@updateSubCategoryPosition');
		Route::patch('/position', 'CategoryPositionController@updatePosition');

		Route::post('/{id}/discounts/{discountId}', 'CategoryDiscountController@addDiscount');
		Route::delete('/{id}/discounts', 'CategoryDiscountController@removeDiscount');

		Route::post('/{id}/image', 'CategoryImageController@store');
		Route::delete('/{id}/image', 'CategoryImageController@destroy');

		Route::patch('/parent-removal/{id}', 'CategoryController@removeParent');
	});

	Route::group(['prefix' => 'products'], function () {
		Route::get('/{id}/edit', 'ProductController@edit');
		Route::post('/{id}/discounts/{discountId}', 'ProductDiscountController@addDiscount');
		Route::delete('/{id}/discounts/remove', 'ProductDiscountController@removeDiscount');

		Route::post('/{id}/ingredients/{ingredientId}/{quantity}', 'ProductIngredientController@addIngredient');
		Route::delete('/{id}/ingredients/{ingredientId}', 'ProductIngredientController@removeIngredient');

		Route::post('/{id}/image', 'ProductImageController@store');
		Route::delete('/{id}/image', 'ProductImageController@destroy');
	});

	Route::group(['prefix' => 'users'], function () {
		Route::delete('{id}/disable', 'UserController@disable');
		Route::post('{id}/restore', 'UserController@restore');

		Route::post('{id}/image', 'UserImageController@store');
		Route::delete('{id}/image', 'UserImageController@destroy');
	});

	Route::apiResource('users', 'UserController', ['as' => 'api']);
	Route::apiResource('roles', 'RoleController', ['as' => 'api']);
	Route::apiResource('products', 'ProductController', ['as' => 'api']);
	Route::apiResource('categories', 'CategoryController', ['as' => 'api'])->except('show');
	Route::apiResource('units', 'UnitController', ['as' => 'api']);
	Route::apiResource('ingredients', 'IngredientController', ['as' => 'api']);
	Route::apiResource('stocks', 'StockController', ['as' => 'api'])->only('update');
	Route::apiResource('discounts', 'DiscountController', ['as' => 'api']);
	Route::apiResource('orders', 'OrderController', ['as' => 'api']);
	Route::apiResource('delivery-methods', 'DeliveryMethodController', ['as' => 'api']);
	// Route::apiResource('order-statuses', 'OrderStatusController');
	Route::apiResource('tables', 'TableController', ['as' => 'api']);
	Route::apiResource('reservations', 'ReservationController', ['as' => 'api'])->only(['index', 'show', 'store', 'destroy']);

	Route::group(['prefix' => 'products'], function () {
		Route::delete('{id}/disable', 'ProductController@disable');
		Route::post('{id}/restore', 'ProductController@restore');

		Route::get('/check-barcode/{barcode}', 'ProductController@getProductByBarcode');
	});

	Route::group(['prefix' => 'stocks'], function () {
		Route::get('products/{barcode}', 'StockController@getProductStockDetailsByBarcode');
		Route::get('ingredients/{input}', 'StockController@getIngredientStockDetails');
	});

	Route::group(['prefix' => 'discounts'], function () {
		Route::delete('{id}/disable', 'DiscountController@disable');
		Route::post('{id}/restore', 'DiscountController@restore');
	});

	Route::group(['prefix' => 'orders'], function () {
		Route::delete('{id}/disable', 'OrderController@disable');
		// Route::post('{id}/restore', 'OrderController@restore');

		Route::get('products/name/{name}', 'OrderItemController@getProductsByName');
		Route::get('products/id/{id}', 'OrderItemController@getProductsById');

		Route::patch('update-status/{orderId}', 'OrderController@updateStatus');

		Route::patch('remove-item/{orderId}', 'OrderItemController@removeItem');
		Route::patch('add-item/{orderId}', 'OrderItemController@addItem');
		Route::patch('patch-item/{orderId}', 'OrderItemController@patchItem');
	});

	Route::group(['prefix' => 'tables'], function () {
		Route::delete('{id}/disable', 'TableController@disable');
		Route::post('{id}/restore', 'TableController@restore');
	});

	Route::group(['prefix' => 'statuses'], function () {
		Route::get('/orders', 'StatusesController@getOrdersStatuses');
		Route::get('/tables', 'StatusesController@getTableStatuses');
		Route::get('/reservations', 'StatusesController@getReservationStatuses');
	});

	Route::patch('/reservations/{id}', 'UpdateReservationStatus');

	Route::group(['prefix' => 'clients'], function () {
		Route::get('phone-number/{phoneNumber}', 'FindUserByPhoneNumber');
		Route::get('addresses/{id}', 'ClientController@getClientAddresses');
	});
});

Route::group(['middleware' => 'auth:web', 'namespace' => 'Api\Client', 'prefix' => 'client'], function () {
	Route::get('reservations/available-tables', 'ReservationsController@getAvailableTables')->name('available-tables');
});
