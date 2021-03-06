<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiscountUpdateRequest extends FormRequest
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
            'code' => ['sometimes'],
            'value' => ['sometimes', 'numeric'],
            'startsAt' => ['sometimes', 'date'],
            'endsAt' => ['required_with:start_date', 'date']
        ];
    }

}
