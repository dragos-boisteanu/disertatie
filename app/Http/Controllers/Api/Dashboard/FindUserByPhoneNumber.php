<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FindUserByPhoneNumber extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $phoneNumber)
    {
			try {
				$user = User::where('phone_number', $phoneNumber)->firstOrFail();

				$data = [
					'id' => $user->id,
					'firstName' => $user->first_name,
					'lastName' => $user->last_name,
					'email' => $user->email
				];

				return response()->json(['client'=> $data], 200);
				
			} catch ( \Illuminate\Database\Eloquent\ModelNotFoundException $e) {
				return response()->json(['message' => 'No user found'], 404);
			} catch ( \Exception $e) {
				return response()->json(['message' => 'Something went wrong, try again later'], 500);
			}
		}
			
}
