<?php

namespace App\Http\Requests\Client;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class AccountUpdateRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'firstName' => ['required', 'string', 'max:255'],
			'lastName' => ['required', 'string', 'max:255'],
			'phoneNumber' => ['required'],
			'newEmail' => ['required', 'email', 'unique:users,email,' . Auth::id()]
		];
	}
}
