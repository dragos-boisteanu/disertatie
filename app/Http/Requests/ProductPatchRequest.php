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
            'basePrice' => 'sometimes|numeric',
            'weight' => 'sometimes|numeric',
            'categoryId' => 'sometimes|numeric|exists:categories,id',
            'subCategoryId' => ['sometimes', 'numeric', 'exists:categories,id'],
            'unitId' => 'sometimes|numeric|exists:units,id',
            'hasIngredients'=>['required', 'bool'],
            'ingredients'=> ['required_if:hasIngredients,true', 'array', 'min:1'],
            'ingregients.*.id' => 'required_with:ingredients|numeric',
            'ingredients.*.quantity' => 'required_with:ingredients|numeric',
            'ingredients.*.unit.id' => 'required_with:ingredients|numeric|exists:units,id',
            'discountId' => ['sometimes','numeric', 'exists:discounts,id'],
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
