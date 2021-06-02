<?php

namespace App\Providers;


use App\Services\OrderService;
use App\Services\OrderItemService;
use App\Services\ProductStockService;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\OrderServiceInterface;
use App\Http\Resources\IngredientCollection;
use App\Interfaces\OrderItemServiceInterface;
use App\Interfaces\ProductStockServiceInterface;

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
        $this->app->bind(OrderItemServiceInterface::class, OrderItemService::class);
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
