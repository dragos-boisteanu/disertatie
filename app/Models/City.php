<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'county_id',
    ];
    
    public $timestamps = false;

    public function county()
    {
        return $this->belongsTo(County::class);
    }
}
