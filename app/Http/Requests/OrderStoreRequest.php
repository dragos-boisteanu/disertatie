<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
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
            'clientId' => ['sometimes', 'numeric', 'exists:users,id'],
            'address' => ['required', 'string'],
            'items' => ['required', 'array'],
            'items.*.id' => ['required'],
            'items.*.name' => ['required', 'string'],
            'items.*.price' => ['required', 'numeric'],
            'items.*.quantity' => ['required', 'numeric'],
            'orbservations' => ['sometimes', 'string']
        ];
    }
}
