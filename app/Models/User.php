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
class User extends Authenticatable implements MustVerifyEmail
{
	use HasFactory, Notifiable, SoftDeletes;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'first_name',
		'last_name',
		'phone_number',
		'email',
		'password',
		'role_id',
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

	public $with = ['role'];

	protected $appends = array('fullName');

	public function getFullNameAttribute()
	{
		return $this->first_name . ' ' . $this->last_name;
	}

	public function role()
	{
		return $this->belongsTo(Role::class);
	}

	public function addresses()
	{
		return $this->hasMany(Address::class);
	}

	public function cart()
	{
		return $this->hasOne(Cart::class);
	}

	public function orders()
	{
		return $this->hasMany(Order::class, 'client_id', 'id');
	}

	public function staffOrders()
	{
		return $this->hasMany(Order::class, 'staff_id');
	}

	public function scopeFilter(Builder $builder, array $data)
	{
		return (new UserFilter($data))->filter($builder);
	}

	public function isAdminitrator()
	{
		return $this->role->level === 7;
	}

	public function isLocationManager()
	{
		return $this->role->level === 6;
	}

	public function isKitchenManager()
	{
		return $this->role->level === 5;
	}

	public function isWaiter()
	{
		return $this->role->level === 4;
	}

	public function isKitchen()
	{
		return $this->role->level === 3;
	}

	public function isDelivery()
	{
		return $this->role->level === 2;
	}

	public function isClient()
	{
		return $this->role->level === 1;
	}
}
