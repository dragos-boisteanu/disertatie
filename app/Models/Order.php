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
        'status_id',
        'phone_number',
        'email',
        'address',
        'observations',
    ];

    public $with = ['products', 'deliveryMethod', 'status', 'client', 'staff'];

    protected $appends = array('totalQuantity', 'totalValue');

    public function getTotalQuantityAttribute()
    {
        $totalQuantity = 0;
        
        forEach($this->products as $item) {
            $totalQuantity += $item->pivot->quantity;
        }

        return $totalQuantity;
    }

    public function getTotalValueAttribute()
    {
        $totalValue = 0;

        forEach($this->products as $item) {
            // $discountedPrice = $this->calculateDiscount($item->pivot->base_unit_price, $item->pivot->discount);
            // $totalValue += $item->pivot->quantity * ($discountedPrice + $this->calculateVat($discountedPrice, $item->pivot->vat));
            $totalValue += $item->getOrderProductFinalPrice($item->pivot->base_unit_price, $item->pivot->discount, $item->pivot->vat);
        }

        $totalValue += $this->deliveryMethod->price;

        return number_format($totalValue, 2, '.', '');
    }

    private function calculateDiscount($basePrice, $discount) 
    {
        return $basePrice - $basePrice * ($discount / 100); 
    }

    private function calculateVat($price, $vat) 
    {
        return  $price + $price * ($vat / 100);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
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
        return $this->belongsTo(DeliveryMethod::class)->withTrashed();
    }

    public function status() 
    {
        return $this->belongsTo(OrderStatus::class);
    }

    public function products() 
    {
        return $this->belongsToMany(Product::class)->withPivot('product_name', 'quantity', 'base_unit_price', 'discount', 'vat');
    }

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function scopeFilter(Builder $builder, array $data)
    {
        return (new OrderFilter($data))->filter($builder);
    }

}
