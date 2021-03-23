<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'quantity',
        'product_id'
    ];

    public function product() 
    {
        return $this->belongsTo('App\Models\Product');
    }
}
