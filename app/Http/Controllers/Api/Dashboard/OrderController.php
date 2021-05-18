<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Order;
use App\Models\Product;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductOrder;
use App\Http\Resources\OrderCollection;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\Order as OrderResource;
use App\Http\Resources\ProductOrderCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Order::with('client', 'staff');
        
        if(!$request->has('orderBy')) {
            $orderByValue = 2;
        } else {
            $orderByValue = $request->orderBy;
        }

        switch ($orderByValue) {
            case 1:
                $query->orderBy('created_at', 'asc');
                break;
            case 2:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $query->orderBy('id', 'asc');

        $orders = $query->filter($request)->paginate(16);

        return new OrderCollection($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrderStoreRequest $request)
    {
        DB::transaction(function () use ($request) {
    
            $order = new Order;

            $order->delivery_method_id = $request->deliveryMethodId;
            $order->address = $request->address;
            $order->phone_number =  $request->phoneNumber;
            $order->status_id = 2;
            $order->staff_id = $request->user()->id;

            if($request->has('observations')) {
                $order->observations =  $request->observations;
            }

            if($request->has('clientId')) {
                $order->client_id = $request->clientId;
            } else {
                $order->first_name = $request->firstName;
            }

            if($request->has('email')) {
                $order->email = $request->email;
                //send email with order details
            }
    
            $order->save();
    
            // add each item into order products table
            // link each item to the order
            foreach($request->items as $item) {
                OrderProduct::create([
                    'order_id' => $order->id,
                    'product_name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }

            // update stocks
            foreach($request->items as $item) {
                $product = Product::findOrFail($item['id']);
                if($product->has_ingredients) {
                    //modify ingredients quantity
                    foreach($product->ingredients as $ingredient) {
                        $ingredient->stock->quantity -= $ingredient->pivot->quantity * $item['quantity'];
                        $ingredient->stock->save();
                    }
                } else {
                    // modify stock quantity
                    $product->stock->quantity -= $item['quantity'];
                    $product->stock->save();
                }
            }
        });

        return response()->json(['message'=>'Order created succesfully'], 200 );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::findOrFail($id);

        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getProductsByName($name)
    {
        try {
            $products = Product::where('name', 'like', $name . '%')->get();
            if(count($products) == 0) {
                throw new ModelNotFoundException('No products for ' . $name . ' name');
            }
            return new ProductOrderCollection($products);
        } catch ( ModelNotFoundException $ex) {
            return response()->json(null, 404);
        }
    }

    public function getProductsById($id)
    {
        $product = Product::findOrFail($id);

        return new ProductOrder($product);
    }
}
