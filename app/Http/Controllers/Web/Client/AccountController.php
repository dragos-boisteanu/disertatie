<?php

namespace App\Http\Controllers\Web\Client;

use Exception;
use App\Models\User;
use Illuminate\Support\Facades\DB;
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
		try {
			DB::beginTransaction();
			$user = User::find(Auth::user()->id);

			$user->first_name = $request->firstName;
			$user->last_name = $request->lastName;
			$user->phone_number = $request->phoneNumber;

			$oldEmail = $user->email;

			if ($request->has('newEmail')) {
				$user->email = $request->newEmail;
			}

			$user->save();


			if ($request->has('newEmail') && $user->email !== $oldEmail) {
				$user->email_verified_at = null;
				$user->save();
				$user->sendEmailVerificationNotification();
			}

			Toastr::success('Datele contului au fost actualizate', 'Success');

			DB::commit();
			return redirect()->back()->with('user', $user);
		} catch (Exception $ex) {
			DB::rollback();
			Toastr::error('Ceva nu a functionat. Incearca mai tarziu', 'Eroare');
			return redirect()->back()->with('user', $user);
		}
	}

	public function updatePassword(PasswordUpdateRequest $request)
	{
		try {
			DB::beginTransaction();
			// $user = User::find(Auth::user()->id);

			Auth::user()->password = Hash::make($request->newPassword);

			Auth::user()->save();

			Auth::user()->refresh();

			Auth::logoutOtherDevices($request->newPassword);

			Toastr::success('Parola a fost actualizata', 'Success');

			DB::commit();

			return redirect()->back();
		} catch (Exception $e) {
			DB::rollback();
			debug($e);
			Toastr::error('Ceva nu a functionat. Incearca mai tarziu', 'Eroare');

			return redirect()->back();
		}
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
