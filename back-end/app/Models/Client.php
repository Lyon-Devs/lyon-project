<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'acting_branches_id'
    ];
    protected $with = [
        'actingBranches'
    ];
    public function actingBranches()
    {
        return $this->belongsTo(ActingBranch::class, 'acting_branches_id');
    }
}
