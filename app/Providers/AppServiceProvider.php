<?php

namespace App\Providers;


use App\Services\CartService;
use App\Services\OrderService;
use App\Services\TableService;
use App\Services\ProductService;
use App\Services\OrderItemService;
use Illuminate\Pagination\Paginator;
use App\Services\ProductStockService;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\CartServiceInterface;
use App\Interfaces\OrderServiceInterface;
use App\Interfaces\TableServiceInterface;
use App\Interfaces\ProductServiceInterface;
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
        $this->app->bind(ProductServiceInterface::class, ProductService::class);
        $this->app->bind(TableServiceInterface::class, TableService::class);
        $this->app->bind(CartServiceInterface::class, CartService::class);
     
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        IngredientCollection::withoutWrapping();
        Paginator::defaultView('vendor.pagination.custom-pagination');
    }
}
