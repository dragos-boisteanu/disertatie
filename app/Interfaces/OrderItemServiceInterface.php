<?php

namespace App\Interfaces;

use App\Models\Order;
use App\Models\Product;
use Carbon\Traits\Date;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Collection;

interface OrderItemServiceInterface
{
	public function getProductsByName(string $productName): Collection;
	public function getProductsById(int $productId): Product;

	public function removeFromOrder(int $itemId, Order $order): Carbon;
	public function addItemToOrder(array $item, Order $order): array;

	public function patchOrderItem(array $data, Order $order): array;
}
