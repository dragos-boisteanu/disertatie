<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\Address;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $addresses = Address::where('user_id', Auth::user()->id)->get();

        return view('store.user.addresses', compact('addresses'));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $address = new Address();

        $address->user_id = Auth::id();
        $address->address = $request->address;
    
        if(Address::where('user_id', Auth::check())->where('is_selected', 1)->doesntExist()) {
            $address->is_selected = 1;
        } else {
            $address->is_selected = null;
        }

        $address->save();
        
        Toastr::success('Adresa a fost adaugata la lista', 'Succes');
        return redirect()->back();
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
        $address = Address::findOrFail($id);

        $selectedAddress = Address::where('user_id', Auth::id())->where('is_selected', 1)->first();

        $selectedAddress->is_selected = null;
        $selectedAddress->save();

        $address->is_selected = $request->isSelected;

        $address->save();
        Toastr::success('Adresa a fost selectata ca adresa principala', 'Succes');
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $address = Address::findOrFail($id);

        $address->delete();

        Toastr::success('Adresa a fost stearsa', 'Succes');
        return redirect()->back();
    }
}
