<?php

namespace App\Http\Controllers\Api\Dashboard;

use Carbon\Carbon;
use App\Models\Discount;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\DiscountCollection;
use App\Http\Requests\DiscountStoreRequest;
use App\Http\Requests\DiscountUpdateRequest;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $discounts = Discount::withTrashed()->with('products','categories')->get();

        return new DiscountCollection($discounts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DiscountStoreRequest $request)
    {
        $request->user()->can('create', Discount::class);

        $input = $request->validated();
        $input['starts_at'] = $request->startsAt;
        $input['ends_at'] = $request->endsAt;
        
        $discount = Discount::create($input);

        return $discount->id;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(DiscountUpdateRequest $request, $id)
    {
        $request->user()->can('update', Discount::class);

        $discount = Discount::withTrashed()->findOrFail($id);

        if($request->has('code')) {
            $discount->code = $request->code;
        }

        if($request->has('value')) {
            $discount->value = $request->value;
        }

        if($request->has('startsAt')) {
            $discount->starts_at = $request->startsAt;
        }

        if($request->has('endsAt')) {
            $discount->ends_at = $request->endsAt;
        }

        $discount->save();

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $request->user()->can('forceDelete', Discount::class);

        $discount = Discount::withTrashed()->with('products', 'categories')->findOrFail($id);

        foreach($discount->products as $product) {
            $product->discount_id = null;
        }

        foreach($discount->categories as $category) {
            $category->discount_id = null;
        }

        $discount->forceDelete();

        return response()->json(null, 200);
    }

    public function disable(Request $request, $id)
    {
        $request->user()->can('delete', Discount::class);

        $discount = Discount::withTrashed()->with('products', 'categories')->findOrFail($id);

        
        foreach($discount->products as $product) {
            $product->discount_id = null;
        }

        foreach($discount->categories as $category) {
            $category->discount_id = null;
        }

        $discount->delete();

        return response()->json(['deletedAt' => Carbon::now()], 200);
    }

    public function restore(Request $request, $id)
    {
        $request->user()->can('restore', Discount::class);

        Discount::withTrashed()->findOrFail($id)->restore();

        return response()->json(null, 200);
    }

}
