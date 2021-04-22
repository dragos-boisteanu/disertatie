<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use function PHPSTORM_META\map;

class ProductStoreRequest extends FormRequest
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
            'barcode' => 'required|numeric|unique:products',
            'name' => 'required|string|max:150',
            'description' => 'required|string|max:255',
            'base_price' => 'required|numeric',
            'weight' => 'required|numeric',
            'category_id' => 'required|numeric|exists:categories,id',
            'unit_id' => 'required|numeric|exists:units,id',
            'hasIngredients' => 'sometimes|boolean',
            'ingredients'=> 'required_with:hasIngredients,true|array',
            'ingregients.*.id' => 'required_with:ingregients,true|numeric',
            'ingredients.*.quantity' => 'required_with:ingregients,true|numeric',
            'ingredients.*.unit.id' => 'required_with:ingregients,true|numeric',
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
