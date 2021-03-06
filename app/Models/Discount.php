<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'value',
        'user_id',
        'starts_at',
        'ends_at'
    ];

    protected $dates = [
        'starts_at',
        'ends_at',
    ];

    public function categories() 
    {
        return $this->hasMany('App\Models\Category');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
