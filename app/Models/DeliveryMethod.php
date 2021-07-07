<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryMethod extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;
    
    protected $appends = array('isDisabled', 'isDelivery', 'isTable', 'isLocal');

    public function orders() 
    {
        return $this->hasMany(Order::class);
    }

    public function getIsDisabledAttribute()
    {
        return $this->deleted_at !== null ? true : false;
    }

    public function getIsDeliveryAttribute()
    {
        return $this->name === 'Livrarea la adresa';
    }

    public function getIsTableAttribute()
    {
        return $this->name === 'Comanda la masa';
    }

    public function getIsLocalAttribute()
    {
        return $this->name === 'Ridicare din local';
    }
}
