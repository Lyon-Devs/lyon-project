<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProposalRevision extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = [
        'created_at',
        'updated_at',
        'data_committee'
    ];

    protected $fillable = [
        'number_revision',
        'data_committee',
        'type_price',
        'medium_histogram',
        'global_price',
        'gross_margin',
        'bdi',
        'taxes',
        'charge',
        'type_warning',
        'risks',
        'financial_taxis',
        'proposal_id'
    ];



    public function proposal()
    {

        return $this->belongsTo(Proposal::class);
    }
}
