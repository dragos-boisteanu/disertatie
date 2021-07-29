<?php

namespace App\Providers;

use App\Services\CartService;
use App\Http\Composers\CartComposer;
use App\Http\Resources\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\CartServiceInterface;

class ViewServiceProvider extends ServiceProvider
{

  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {
  }

  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot()
  {
    View::composer([
      'includes.header',
    ], CartComposer::class);

    // View::composer('components.mobile-cart-button', CartItemsCountComposer::class);
  }
}
