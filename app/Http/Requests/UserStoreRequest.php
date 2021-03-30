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
            'data.user.birthdate' => 'required|date',
            'data.user.phone_number' => 'required|string|unique:users,phone_number',
            'data.user.email' => 'required|string|email|max:255|unique:users,email',
            'data.user.role_id' => 'required|integer|exists:roles,id',
            
            'data.address.first_name' => 'sometimes|required|string|max:255',
            'data.address.name' => 'sometimes|required|string|max:255',
            'data.address.phone_number' => 'sometimes|required|string',
            'data.address.county_id' => 'sometimes|required|integer|exists:counties,id',
            'data.address.city_id' => 'sometimes|required|integer|exists:cities,id',
            'data.address.address' => 'sometimes|required|string|max:255'
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

            'data.address.first_name' => 'first name',
            'data.address.name' => 'name',
            'data.address.phone_number' => 'phone number',
            'data.address.county_id' => 'county',
            'data.address.city_id' => 'vity',
            'data.address.address' => 'address'
        ];
    }
}
