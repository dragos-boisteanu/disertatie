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
            'phoneNumber' => ['sometimes'],
            'email' => ['sometimes', 'email'],
            'name' => ['sometimes', 'string'],
            'address' => ['required', 'string'],
            'deliveryMethodId' => ['required', 'numeric', 'exists:delivery_methods,id'],
            'orbservations' => ['sometimes', 'string'],
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'exists:products,id'],
            'items.*.name' => ['required', 'string'],
            'items.*.price' => ['required', 'numeric'],
            'items.*.quantity' => ['required', 'numeric'],
           
        ];
    }
}
