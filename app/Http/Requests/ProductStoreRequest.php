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
            'basePrice' => 'required|numeric',
            'weight' => 'required|numeric',
            'categoryId' => 'required|numeric|exists:categories,id',
            'subCategoryId' => ['sometimes', 'numeric', 'exists:categories,id'],
            'unitId' => 'required|numeric|exists:units,id',
            'ingredients'=> ['nullable', 'array'],
            'ingregients.*.id' => 'required_with:ingredients|numeric',
            'ingredients.*.quantity' => 'required_with:ingredients|numeric',
            'ingredients.*.unit.id' => 'required_with:ingredients|numeric|exists:units,id',
            'discountId' => ['nullable','numeric'],
        ];
    }
}
