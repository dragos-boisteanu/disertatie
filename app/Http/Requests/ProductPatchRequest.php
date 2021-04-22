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
            'base_price' => 'sometimes|numeric',
            'weight' => 'sometimes|numeric',
            'category_id' => 'sometimes|numeric|exists:categories,id',
            'unit_id' => 'sometimes|numeric|exists:units,id',
            'ingredients'=> 'sometimes|array',
            'ingregients.*.id' => 'required_with:ingregients|numeric',
            'ingredients.*.quantity' => 'required_with:ingregients|numeric',
            'ingredients.*.unit.id' => 'required_with:ingregients|numeric|exists:units,id',
            'discount' => ['sometimes'],
            'discounts.id' => ['required_with:discounts','numeric', 'exists:discounts,id'],
            'discount.fromDate' => ['required_with:discounts', 'date'],
            'discount.toDate' => ['required_with:discounts', 'date'],
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
