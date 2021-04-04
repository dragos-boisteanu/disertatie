<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    public function products()
    {
        return $this->hasMany('App\Models\Product');
    }

    public function ingredients()
    {
        return $this->hasMany('App\Models\Ingredients');
    }
}
