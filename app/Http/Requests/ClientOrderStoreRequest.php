<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ClientOrderStoreRequest extends FormRequest
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
        $validaitonArray = [
            'observations' => ['sometimes'],
            'tableId' => ['required_if:deliveryMethod,3', 'numeric', 'exists:tables,id'],
            'deliveryMethodId' => ['required', 'numeric', 'exists:delivery_methods,id'],
            'paymentMethod' => ['required', 'numeric', 'exists:payment_methods,id'],
        ];

        if(Auth::check()) {
            $validaitonArray += [
                'deliveryAddress' => ['required_if:deliveryMethod,1'],
                'newAddress' => ['sometimes:deliveryAddress,new', 'string', 'max:255'],
            ];
        } else {
            $validaitonArray += [
                'phoneNumber' => ['required_if:deliveryMethod,1,2'],
                'name' => ['required_if:deliveryMethod,1,2', 'string', 'max:100'],
                'email' => ['required_if:deliveryMethod,1', 'email'],
                'address' => ['required_if:deliveryMethod,1', 'string', 'max:255'],
            ];
        }

        return $validaitonArray;
        // return [];
    }
}
