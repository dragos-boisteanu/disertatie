<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'vat',
        'color',
        'discount_id',
        'parent_id',
    ];

    public $with = ['discount'];

    public function products() 
    {
        return $this->hasMany(Product::class);
    }

    public function subProducts() 
    {
        return $this->hasMany(Product::class, 'sub_category_id');
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function subCategories() 
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parentCategory() 
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
}
