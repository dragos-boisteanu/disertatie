<?php

namespace App\Http\Controllers\Web\Client;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Client\EmailUpdateRequest;
use App\Http\Requests\Client\AccountUpdateRequest;
use App\Http\Requests\Client\PasswordUpdateRequest;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('store.user.account', ['user' => Auth::user()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AccountUpdateRequest $request)
    {
        $user = User::find(Auth::user()->id);

        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->phone_number = $request->phoneNumber;
        $user->email = $request->email;

        $user->save();

        Toastr::success('Datele contului au fost actualizate', 'Success');

        return redirect()->back()->with('user', $user);
    }

    public function updatePassword(PasswordUpdateRequest $request)
    {
        $user = User::find(Auth::user()->id);

        $user->password = Hash::make($request->password);

        $user->save();

        Toastr::success('Parola a fost actualizata', 'Success');

        return redirect()->back()->with('user', $user);
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
