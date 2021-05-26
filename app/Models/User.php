<?php

namespace App\Models;

use App\Models\Role;
use App\Models\Discount;
use Illuminate\Http\Request;
use App\Filters\User\UserFilter;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

// implements MustVerifyEmail
class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'name',
        'phone_number',
        'email',
        'password',
        'role_id',
        'birthdate'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public $with = ['role', 'addresses'];

    // protected $appends = array('isAdmin', 'isLocationManager', 'isWaiter', 'isKitchenManager', 'isDelivery', 'isKitchen');
    
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function addresses() 
    {
        return $this->hasMany(Address::class);
    }

    public function discount()
    {
        return $this->belongsToMany('App\Models\Discount');
    }

    public function scopeFilter(Builder $builder, Request $request)
    {
        return (new UserFilter($request))->filter($builder);
    }

    // public function isAdmin() {
    //     return $this->role->name === "Administrator";
    // }

    // public function isLocationManager() 
    // {
    //     return $this->role->name === "Location Manager";
    // }

    // public function isWaiter() 
    // {
    //     return $this->role->name === "Waiter";
    // }

    // public function isKitchenManager() {
    //     return $this->role->name === "Kitchen Manager";
    // }

    // public function isDelivery() {
    //     return $this->role->name === "Delivery";
    // }

    // public function isKitchen() {
    //     return $this->role->name === "Kitchen";
    // }
}
