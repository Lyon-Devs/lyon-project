<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractRenegotiation extends Model
{
    use HasFactory;

    protected $fillable = [
        'number_renegotiation',
        'year',
        'purchasing_period',
        'readjustment_base',
        'required',
        'approved',
        'contract_id',
    ];
    protected $dates = [
        'purchasing_period'
    ];
}
