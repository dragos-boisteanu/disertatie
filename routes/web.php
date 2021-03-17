<?php

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
    return view('welcome');
})->name('home');




Route::get('/dashboard/{any?}', 'Web\Dashboard\DashboardController@index')->where('any', '.*')
    ->middleware(['verified', 'auth', 'dashboard.access'])->name('dashboard');


require __DIR__.'/auth.php';
