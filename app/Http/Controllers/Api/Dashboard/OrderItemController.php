<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Services\OrderItemService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderProduct;
use App\Http\Resources\ModalOrderProduct;
use App\Interfaces\OrderItemServiceInterface;
use App\Interfaces\ProductStockServiceInterface;
use App\Http\Resources\ModalOrderProductCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderItemController extends Controller
{
    private $orderItemService;

    public function __construct(OrderItemServiceInterface $orderItemService)
    {
        $this->orderItemService = $orderItemService;
    }

    public function getProductsByName($name)
    {
        $products = $this->orderItemService->getProductsByName($name);
        return new ModalOrderProductCollection($products);
    }

    public function getProductsById($id)
    {
        try {
            $product = $this->orderItemService->getProductsById($id);
            return new ModalOrderProduct($product);
        } catch (ModelNotFoundException $me) {
            return  response()->json(['message'=>$me->getMessage()], 404);
        } catch (\Exception $e) {
            return  response()->json(['message'=>$e->getMessage()], 500);
        }    
    }

    public function removeItem(Request $request, $orderId) 
    {
       try {
            $updatedAt = $this->orderItemService->removeFromOrder($request->itemId, $orderId);
            return $updatedAt;
        } catch (ModelNotFoundException $me) {
            return  response()->json(['message'=>$me->getMessage()], 404);
        } catch (\Exception $e) {
            return  response()->json(['message'=>$e->getMessage()], 500);
        }    
    }
    
    public function addItem(Request $request, $orderId)
    {
        try {
            $result = $this->orderItemService->addItemToOrder($request->item, $orderId);
            return response()->json($result, 200);
        } catch (ModelNotFoundException $me) {
            return  response()->json(['message'=>$me->getMessage()], 404);
        } catch (\Exception $e) {
            return  response()->json(['message'=>$e->getMessage()], 500);
        }   
    }

    public function patchItem(Request $request, $orderId) 
    {
        try {
            $result = $this->orderItemService->patchOrderItem($request->all(), $orderId);
            return response()->json($result, 200);
        }   catch (ModelNotFoundException $me) {
            return  response()->json(['message'=>$me->getMessage()], 404);
        } catch (\Exception $e) {
            return  response()->json(['message'=>$e->getMessage()], 500);
        }   
    }
}
