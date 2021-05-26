<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderProduct;
use App\Http\Resources\ModalOrderProduct;
use App\Http\Resources\ModalOrderProductCollection;

class OrderItemController extends Controller
{
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

            $product->addBackToStock();

            $order->products()->detach($request->itemId);
            
            $order->save(); 
            $order->fresh();   
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

            $order->save();
            $order->refresh();

            $product->removeFromStock($item['quantity']);
        });

        $newProduct = $order->products()->where('product_id', $item['id'])->first();

        return response()->json([
            'item' => new OrderProduct($newProduct),
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
                $product->removeFromStock($request->quantity - $product->pivot->quantity);
            } else if ($request->quantity < $product->pivot->quantity) {
                $product->addBackToStock($product->pivot->quantity - $request->quantity);
            }

            $order->save();
            $order->refresh();
            
        });

        return response()->json([
            'totalValue' => $order->getTotalValueAttribute(),
            'totalQuantity' => $order->getTotalQuantityAttribute(),
            'updatedAt' => $order->updated_at
        ]);
    }
}
