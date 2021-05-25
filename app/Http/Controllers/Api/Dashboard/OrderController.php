<?php

namespace App\Http\Controllers\Api\Dashboard;

use Exception;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderProduct;
use App\Http\Resources\OrderCollection;
use App\Http\Requests\OrderPatchRequest;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Resources\ModalOrderProduct;
use App\Http\Resources\Order as OrderResource;
use App\Http\Resources\ModalOrderProductCollection;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Order::withTrashed()->with('client', 'staff');
        
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
        DB::beginTransaction();

        try  {
    
            $order = new Order;

            $order->delivery_method_id = $request->deliveryMethodId;

            $order->address = $request->address;
            $order->phone_number =  $request->phoneNumber;

            $order->status_id = 2; // recieved
            $order->staff_id = $request->user()->id;
           
            if($request->has('name')) {
                $order->name = $request->name;
            }   

            if($request->has('observations')) {
                $order->observations =  $request->observations;
            }

            if($request->has('clientId')) {
                $order->client_id = $request->clientId;
            }          

            if($request->has('email')) {
                $order->email = $request->email;
                //send email with order details
            }
    
            $order->save();
    
            // add each item into order products table
            // link each item to the order
            
            foreach($request->items as $item) {
                $product = Product::findOrFail($item['id']);
                $order->products()->attach($item['id'], [
                "product_name"=>$product->name, 
                "quantity"=>$item['quantity'], 
                "unit_price"=>$product->price,              
                ]);
            }
            
            // update stocks
            foreach($request->items as $item) {
                $product = Product::findOrFail($item['id']);
                $product->removeFromStock($product, $item);
            }

            DB::commit();
            
            return response()->json(['message'=>'Order created succesfully'], 200 );

        } catch (\Exception $e ) {
            DB::rollBack();
            return  response()->json(['message'=>$e->getMessage()], 400 );
        };
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::with('client', 'staff')->withTrashed()->findOrFail($id);

        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(OrderPatchRequest $request, $id)
    {
        $order = Order::findOrfail($id);

        $order->update($request->validated());

        return $order->updated_at;
    }

    public function disable($id) 
    {
        $order = Order::findOrFail($id);

        // restore products stock
        // iterate over each item from the order

        // if the product has ingredients, get how many ingredients a product requires, multiply the individual ingredient needed quantity 
        // with the count of the product from order
        // add each ingredient computed value to it's stock

        // if the product doesn't have ingredeitns just add the quantity(number of products in the order) to it's stock
        // and remove the products from OrderProduct

        DB::transaction(function () use ($order){
            forEach($order->products as $product) {
                $product->addBackToStock($product);
            }

            $order->status_id = 8;
            $order->save();

            $order->delete();
        });
          
        $order->refresh();

        return $order->deleted_at;
    }
}
