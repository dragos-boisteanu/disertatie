<?php

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('store.menu.index');
})->name('home');


Route::get('/dashboard/{any?}', 'Web\Dashboard\DashboardController@index')->where('any', '.*')
    ->middleware(['auth', 'dashboard.access'])->name('dashboard');
// verified

Route::group(['middleware' => 'auth:web', 'namespace' => 'Web\Client'], function () {
    Route::group(['prefix'=>'account'], function() {
        Route::get('/', 'AccountController@index')->name('account.index');
        Route::put('/', 'AccountController@update')->name('account.update');
        Route::delete('/'. 'AccountController@destroy')->name('account.delete');

    });

    Route::group(['prefix'=>'addressess'], function() {
        Route::get('/', 'AddressController@index')->name('address.index');
        Route::post('/', 'AddressController@store')->name('address.store');
        Route::put('/{id}/edit', 'AddressController@edit')->name('address.edit');
        Route::put('/{id}', 'AddressController@update')->name('address.update');
        Route::delete('/{id}', 'AddressController@destroy')->name('address.delete');
    });
});

Route::group(['namespace' => 'Web\Client'], function () {
    Route::get('/', 'MenuController@index')->name('home');

    Route::get('/menu', 'MenuController@index')->name('menu.index');
    Route::get('/menu/{id}', 'MenuController@show')->name('menu.show');

    Route::group(['prefix'=>'cart'], function() { 
        Route::get('/', 'CartController@index')->name('cart.index');
        Route::post('/{productId}', 'CartController@store')->name('cart.store');
        Route::put('/{id}', 'CartController@update')->name('cart.patch');
        Route::delete('/{id}', 'CartController@destroy')->name('cart.delete');
    });

    Route::group(['prefix'=>'checkout'], function() { 
        Route::get('/', 'OrderController@create')->name('checkout.create');
    });
  
});

require __DIR__ . '/auth.php';


Route::get('/order-email/{id}', function ($id) {
    $order = Order::findOrFail($id);
    return view('mails.order', compact('order'));
});
