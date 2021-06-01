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
            'avatar' => 'sometimes|string',
            'firstName' => 'sometimes|required|string|max:255',
            'lastName' => 'sometimes|string|max:255',
            'phoneNumber' => 'sometimes|string|unique:users,phone_number',
            'email' => 'sometimes|string|email|max:255|unique:users,email',
            'role.id' => 'sometimes|integer|exists:roles,id',
        ];
    }
}
