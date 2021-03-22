<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    public $preserveKeys = true;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'name' => $this->name,
            'birthdate' => $this->birthdate,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'roleId' => $this->role->id,
            'deletedAt' => $this->deleted_at,
            'createdAt' => $this->created_at
        ];
    }
}
