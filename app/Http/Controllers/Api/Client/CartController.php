<?php

namespace App\Http\Controllers\Api\Client;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Http\Resources\CartItem;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\CartServiceInterface;
use App\Http\Resources\CartItemCollection;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CartController extends Controller
{

    private $cartService;

    public function __construct(CartServiceInterface $cartService)
    {
        $this->cartService = $cartService;
    }
    
       
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cartId = Auth::user()->cart->id;
        $cartItems = $this->cartService->getCatItems($cartId);

        return new CartItemCollection($cartItems);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            if(Auth::check()) {
                $cart = $this->cartService->getCart(Auth::user(), session()->getId());
            } else {
                $cart = $this->cartService->getCart(null, session()->getId());
            }
    
            $newQuantity =  $this->cartService->addToCart($cart, $request->id, $request->quantity);

            $product = Product::find($request->id);

            DB::commit();
            return response()->json([
                'message' => 'Product added to cart',
                'newQuantity' => $newQuantity,
                'name' => $product->name,
                'price' => $product->price,
            ], 200);
        } catch ( ModelNotFoundException $mdfe ) {
            DB::rollBack();
            return response()->json(['message'=> 'Cart not found'], 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
}
