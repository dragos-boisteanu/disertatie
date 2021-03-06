<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
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
            'name' => 'sometimes|string|max:50',
            'vat' => 'sometimes|numeric',
            'discountId' => ['sometimes','numeric', 'exists:discounts,id'],
            'parentId' => ['sometimes', 'numeric', 'exists:categories,id'],
            'removeDiscount' => ['sometimes', 'boolean']
        ];
    }
}
