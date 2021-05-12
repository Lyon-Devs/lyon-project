<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProposalUser extends Model
{
    use HasFactory;

    protected $table = 'proposal_user';
    protected $fillable = [
        'user_id',
        'type',
        'proposal_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
