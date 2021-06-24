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


Route::group(['namespace'=>'Web\Client'], function() {  
    Route::get('/', 'MenuController@index')->name('home');
    Route::get('/menu', 'MenuController@index')->name('menu-index');
    Route::get('/menu/{id}', 'MenuController@show')->name('menu-show');
    Route::get('/cart', 'CartController@index')->name('cart-index');
});
// verified


require __DIR__.'/auth.php';


Route::get('/order-email/{id}', function($id) {
    $order = Order::findOrFail($id);
    return view('mails.order', compact('order'));
});
