<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserPatchRequest extends FormRequest
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
            'avater' => 'sometimes|stirng',
            'first_name' => 'sometimes|required|string|max:255',
            'name' => 'sometimes|string|max:255',
            'birthdate' => 'sometimes|date',
            'phone_number' => 'sometimes|string|unique:users,phone_number',
            'email' => 'sometimes|string|email|max:255|unique:users,email',
            'roleId' => 'sometimes|integer|exists:roles,id',
        ];
    }

    public function attributes()
    {
        return [
            'first_name' => 'first name',
            'name' => 'name',
            'birthdate' => 'birthdate',
            'phone_number' => 'phone number',
            'email' => 'email',
            'role_id' => 'role',
        ];
    }
}
