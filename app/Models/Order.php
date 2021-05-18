<?php

namespace App\Models;

use Illuminate\Http\Request;
use function PHPSTORM_META\map;
use App\Filters\Order\OrderFilter;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id',
        'staff_id',
        'payment_method_id',
        'delivery_method_id',
        'phone_number',
        'status_id',
        'email',
        'address',
        'observations',
    ];

    public $with = ['items'];

   protected $appends = array('totalQuantity', 'totalValue');

   public function getTotalQuantityAttribute()
    {
        $totalQuantity = 0;
        
        forEach($this->items as $item) {
            $totalQuantity += $item->quantity;
        }

        return $totalQuantity;
    }

    public function getTotalValueAttribute()
    {
        $totalValue = 0;

        forEach($this->items as $item) {
            $totalValue += $item->quantity + $item->price;
        }

        return number_format($totalValue, 2, '.', '');
    }

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

    public function status() 
    {
        return $this->belongsTo(OrderStatus::class);
    }

    public function scopeFilter(Builder $builder, Request $request)
    {
        return (new OrderFilter($request))->filter($builder);
    }

}
