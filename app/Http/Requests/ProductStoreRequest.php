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
            'barcode' => 'required',
            'name' => 'required',
            'description' => 'required',
            'base_price' => 'required',
            'weight' => 'required',
            'category_id' => 'required',
            'unit_id' => 'required'
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

    protected function prepareForValidation()
    {
        $this->merge([
            'base_price' => str_replace(',', '.', $this->base_price),
        ]);
    }
}
