<?php

namespace App\Providers;


use App\Http\Resources\IngredientCollection;
use App\Interfaces\OrderServiceInterface;
use App\Interfaces\ProductStockServiceInterface;
use App\Services\OrderService;
use App\Services\ProductStockService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ProductStockServiceInterface::class, ProductStockService::class);
        $this->app->bind(OrderServiceInterface::class, OrderService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // JsonResource::withoutWrapping();
        IngredientCollection::withoutWrapping();
    }
}
