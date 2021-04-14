<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\DiscountStoreRequest;
use App\Http\Resources\DiscountCollection;
use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $discounts = Discount::withTrashed()->get();

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
        $input['user_id'] = $request->user()->id;

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
    public function update(Request $request, $id)
    {
        $request->user()->can('update', Discount::class);
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
    }

    public function disable(Request $request, $id)
    {
        $request->user()->can('delete', Discount::class);

        Discount::findOrFail($id)->delete();
        return response()->json(null, 200);
    }

    public function restore(Request $request, $id)
    {
        $request->user()->can('restore', Discount::class);

        Discount::withTrashed()->findOrFail($id)->restore();

        return response()->json(null, 200);
    }

}
