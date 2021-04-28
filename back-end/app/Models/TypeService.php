<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeService extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'unity_business',
        'email_group',
    ];


    public function getEmailsAttribute()
    {
        return explode(',', $this->email_group);
    }
}
