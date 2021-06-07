<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
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
            'avatar' => 'sometimes|string',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            // 'data.user.birthdate' => 'sometimes|date',
            'phoneNumber' => 'required|string|unique:users,phone_number',
            'email' => 'required|string|email|max:255|unique:users,email',
            'roleId' => 'required|integer|exists:roles,id',

            'address' => 'sometimes|required|string|max:255'
        ];
    }

    public function attributes()
    {
        return [
            'data.user.first_name' => 'first name',
            'data.user.name' => 'name',
            'data.user.birthdate' => 'birthdate',
            'data.user.phone_number' => 'phone number',
            'data.user.email' => 'email',
            'data.user.role_id' => 'role',

            'data.address' => 'address'
        ];
    }
}
