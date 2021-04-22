<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Proposal extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'cod_lyon',
        'acting_branch_id',
        'buyer_id',
        'client_id',
        'date_delivery_comercial_proposal',
        'date_delivery_technique_proposal',
        'date_request',
        'date_technique_visit',
        'deadline_date_confirme',
        'deadline_time_confirme',
        'details_technique_visit',
        'local_technique_visit',
        'medium_histogram',
        'months_exec',
        'number_client_request',
        'observations',
        'place_to_deploys_services',
        'scope',
        'summary_scope',
        'time_technique_visit',
        'status'

    ];

    protected $dates = [
        'deadline_date_confirme',
        'date_delivery_comercial_proposal',
        'date_delivery_technique_proposal',
        'date_request',
        'date_technique_visit',
    ];


    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function buyer()
    {
        return $this->belongsTo(Buyer::class);
    }
    public function actingBranch()
    {
        return $this->belongsTo(ActingBranch::class);
    }
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
