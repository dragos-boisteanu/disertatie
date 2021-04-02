<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductPatchRequest extends FormRequest
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
            'image' => 'sometimes|string',
            'barcode' => 'sometimes|numeric|unique:products',
            'name' => 'sometimes|string|max:150',
            'description' => 'sometimes|string|max:255',
            'base_price' => 'sometimes',
            'weight' => 'sometimes',
            'category_id' => 'sometimes|numeric|exists:categories,id',
            'unit_id' => 'sometimes|numeric|exists:units,id'
        ];
    }

    public function attributes()
    {
        return [
            'base_price' => 'base price',
            'category_id' => 'category',
            'unit_id' => 'weight unit',
        ];
    }
}
