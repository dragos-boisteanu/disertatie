<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderProduct;
use App\Http\Resources\ModalOrderProduct;
use App\Interfaces\ProductStockServiceInterface;
use App\Http\Resources\ModalOrderProductCollection;

class OrderItemController extends Controller
{
    private $productStockService;

    public function __construct(ProductStockServiceInterface $productStockService)
    {
        $this->productStockService = $productStockService;
    }

    public function getProductsByName($name)
    {
        $products = Product::where('name', 'like', '%' . $name . '%')->get();

        return new ModalOrderProductCollection($products);
        
    }

    public function getProductsById($id)
    {
        $product = Product::findOrFail($id);

        return new ModalOrderProduct($product);
    }

    public function removeItem(Request $request, $orderId) 
    {
        $order = Order::findOrFail($orderId);

        DB::transaction(function () use ($order, $request) {

            $product = $order->products()->where('product_id', $request->itemId)->first();

            $this->productStockService->addBackToStock($product);

            $order->products()->detach($request->itemId);

            $order->touch();
            
            $order->save(); 
            $order->refresh();   
        });

        return $order->updated_at;
    }
    
    public function addItem(Request $request, $orderId)
    {
        $order = Order::findOrFail($orderId);

        $item = $request->item;

        DB::transaction(function () use ($order, $item) {
            $product = $order->products()->where('product_id',  $item['id'])->first();
            if(isset($product)) {
                $newQuantity = $product->pivot->quantity + $item['quantity'];
                $order->products()->updateExistingPivot($item['id'], ['quantity'=>$newQuantity]);
            } else {
                $product = Product::findOrFail($item['id']);
                $order->products()->attach($item['id'], [
                    "product_name"=>$product->name, 
                    "quantity"=>$item['quantity'], 
                    "unit_price"=>$product['price'],              
                ]);
            }

            $order->touch();

            $order->save();
            $order->refresh();

            $this->productStockService->removeFromStock($product, $item['quantity']);

        });

        $product = $order->products()->where('product_id',  $item['id'])->firstOrFail();
        
        return response()->json([
            'item' => new OrderProduct($product),
            'totalValue' => $order->getTotalValueAttribute(),
            'totalQuantity' => $order->getTotalQuantityAttribute(),
            'updatedAt' => $order->updated_at
        ]);
    }

    public function patchItem(Request $request, $orderId) 
    {
        $order = Order::findOrFail($orderId);

        DB::transaction(function () use($request, $order) {
            $product = $order->products()->where('product_id', $request->itemId)->first();
            // $product->pivot->quantity = $request->quantity;
            $order->products()->updateExistingPivot($request->itemId, ['quantity'=>$request->quantity]);

            if($request->quantity > $product->pivot->quantity) {
                $this->productStockService->removeFromStock($product, $request->quantity - $product->pivot->quantity);
            } else if ($request->quantity < $product->pivot->quantity) {
                $this->productStockService->addBackToStock($product, $product->pivot->quantity - $request->quantity);
            }

            $order->touch();

            $order->save();
            $order->refresh();
            
        });

        $product = $order->products()->where('product_id', $request->itemId)->first();

        $itemTotalPrice = number_format($product->pivot->unit_price * $product->pivot->quantity, 2, '.', '');

        return response()->json([
            'itemTotalPrice' => $itemTotalPrice,
            'totalValue' => $order->getTotalValueAttribute(),
            'totalQuantity' => $order->getTotalQuantityAttribute(),
            'updatedAt' => $order->updated_at
        ]);
    }
}
