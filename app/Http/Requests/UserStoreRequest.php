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
            'data.user.avatar' => 'sometimes|string',
            'data.user.first_name' => 'required|string|max:255',
            'data.user.name' => 'required|string|max:255',
            // 'data.user.birthdate' => 'sometimes|date',
            'data.user.phone_number' => 'required|string|unique:users,phone_number',
            'data.user.email' => 'required|string|email|max:255|unique:users,email',
            'data.user.role_id' => 'required|integer|exists:roles,id',

            'data.address' => 'sometimes|required|string|max:255'
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
