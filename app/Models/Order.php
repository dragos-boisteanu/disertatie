<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use function PHPSTORM_META\map;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id',
        'staff_id',
        'payment_method_id',
        'delivery_method_id',
        'phone_number',
        'email',
        'address',
        'observations',
    ];

    public function paymentMethod()
    {
        return $this->hasOne(PaymentMethod::class);
    }

    public function items()
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function client()
    {
        return $this->hasOne(User::class, 'id', 'client_id');
    }

    public function staff()
    {
        return $this->hasOne(User::class, 'id', 'staff_id');
    }

    public function deliveryMethod()
    {
        return $this->hasOne(DeliveryMethod::class);
    }

}
