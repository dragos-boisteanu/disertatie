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

Route::get('/dashboard/{any?}', 'Web\Dashboard\DashboardController@index')->where('any', '.*')
	->middleware(['auth', 'dashboard.access'])->name('dashboard');
// verified


Route::group(['middleware' => 'auth:web', 'namespace' => 'Web\Client'], function () {
	Route::group(['prefix' => 'account'], function () {
		Route::get('/', 'AccountController@index')->name('account.index');
		Route::put('/', 'AccountController@update')->name('account.update');
		Route::put('/password/update', 'AccountController@updatePassword')->name('account.password.update');
		Route::delete('/' . 'AccountController@destroy')->name('account.delete');
		Route::get('/orders', 'OrderController@index')->name('orders.index');
		Route::get('/orders/{id}', 'OrderController@show')->name('orders.show');
		Route::resource('reservations', 'ReservationController')->except(['create', 'edit']);
	});

	Route::group(['prefix' => 'addressess'], function () {
		Route::get('/', 'AddressController@index')->name('address.index');
		Route::post('/', 'AddressController@store')->name('address.store');
		Route::put('/{id}/edit', 'AddressController@edit')->name('address.edit');
		Route::put('/{id}', 'AddressController@update')->name('address.update');
		Route::delete('/{id}', 'AddressController@destroy')->name('address.delete');
	});
});

Route::group(['namespace' => 'Web\Client'], function () {
	Route::get('/', 'HomeController')->name('home');

	Route::get('/contact', 'Web\Client\ContactController@index')->name('contact');

	Route::group(['prefix' => 'meniu'], function () {
		Route::get('/', 'MenuController@index')->name('menu.index');
		Route::get('/{categorySlug}', 'MenuController@show')->name('category.show');
		Route::get('/{categorySlug}/{productSlug}', 'ProductController@show')->name('products.show');
	});

	Route::group(['prefix' => 'carts'], function () {
		Route::post('/{productId}', 'CartController@store')->name('carts.store');
		Route::put('/{id}', 'CartController@update')->name('carts.patch');
		Route::delete('/{id}', 'CartController@destroy')->name('carts.delete');
	});

	Route::group(['prefix' => 'checkout'], function () {
		Route::get('/', 'OrderController@create')->name('orders.create');
		Route::post('/', 'OrderController@store')->name('orders.store');
	});
});

require __DIR__ . '/auth.php';
