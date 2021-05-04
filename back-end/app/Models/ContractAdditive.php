<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractAdditive extends Model
{
    use HasFactory;

    protected $dates = [
        'date_end',
        'date_start',
        'deadline'
    ];
    protected $fillable = [
        'number_additive',
        'type',
        'date_start',
        'date_end',
        'value',
        'description',
        'deadline'
    ];
}
