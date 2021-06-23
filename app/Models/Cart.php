<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $with = ['items'];

    protected $appends = array('itemsCount');
    
    public function getItemsCountAttribute()
    {
        $itemsCount = 0 ;

        foreach($this->items as $item) {
            $itemsCount += $item->pivot->quantity;
        }

        return $itemsCount;
    }

    public function items()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
