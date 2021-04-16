<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Buyer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'client_id'];

    protected $with = [
        'client'
    ];
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
