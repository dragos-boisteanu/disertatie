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
            'code' => ['required'],
            'percent' => ['required', 'numeric'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date'],
            'user_id' => ['required', 'numeric', 'exists:users, id'],
        ];
    }

    public function attributes()
    {
        return [
            'starts_at' => 'starts at',
            'ends_at' => 'ends at',
            'user_id' => 'created by',
        ];
    }
}
