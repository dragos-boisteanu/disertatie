<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Dashboard\UserController;

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
    // Route::resource('user', [UserController::class]);
    Route::get('/users', 'UserController@index');
    // Route::get('/users/{id}', 'UserController@show');
});


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
