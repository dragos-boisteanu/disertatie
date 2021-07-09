<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory, SoftDeletes, Sluggable, SluggableScopeHelpers;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'vat',
        'color',
        'discount_id',
        'parent_id',
    ];

    public $with = ['discount'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

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
