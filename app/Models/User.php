<?php

namespace App\Models;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Filters\User\UserFilter;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

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

    public $with = ['role'];
    
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function addresses() 
    {
        return $this->hasMany(Address::class);
    }

    public function scopeFilter(Builder $builder, Request $request)
    {
        return (new UserFilter($request))->filter($builder);
    }
}
