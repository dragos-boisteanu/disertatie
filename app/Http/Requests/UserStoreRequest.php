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
            'user.first_name' => 'required|string|max:255',
            'user.name' => 'required|string|max:255',
            'user.birthdate' => 'required|date',
            'user.phone_number' => 'required|string|unique:users,phone_number',
            'user.email' => 'required|string|email|max:255|unique:users,email',
            'user.role' => 'required|integer',
            
            'user.address.first_name' => 'required|string|max:255',
            'user.address.name' => 'required|string|max:255',
            'user.address.phone_number' => 'required|string',
            'user.address.county_id' => 'required|integer',
            'user.address.city_id' => 'required|integer',
            'user.address.address' => 'required|string|max:255'
        ];
    }

    public function attributes()
    {
        return [
            'user.first_name' => 'first name',
            'user.name' => 'name',
            'user.birthdate' => 'birthdate',
            'user.phone_number' => 'phone number',
            'user.email' => 'email',

            'user.address.first_name' => 'first name',
            'user.address.name' => 'name',
            'user.address.phone_number' => 'phone number',
            'user.address.county_id' => 'county',
            'user.address.city_id' => 'vity',
            'user.address.address' => 'address'
        ];
    }
}
