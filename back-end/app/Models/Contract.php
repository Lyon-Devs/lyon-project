<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contract extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = [
        'created_at',
        'updated_at',
        'date_start',
        'date_end',
        'readjustment_base_date',
    ];
    protected $fillable = [
        'center_of_cost',
        'contract_number',
        'purchase_order',
        'manager_lyon',
        'manager_lyon_email',
        'manager_client',
        'manager_client_email',
        'date_start',
        'date_end',
        'readjustment_base_date',
        'proposal_id'
    ];

    public function proposal()
    {
        return $this->belongsTo(Proposal::class);
    }
    public function additives()
    {
        return $this->hasMany(ContractAdditive::class);
    }
    public function renegotiation()
    {
        return $this->hasMany(ContractRenegotiation::class);
    }
    public function scopeClient($query, $client)
    {
        return $query->whereHas('proposal', function (Builder $query) use ($client) {
            return $query->whereHas('client', function (Builder $query) use ($client) {
                return $query->where('id', $client);
            });
        });
    }

    public function scopeActive($query, $active)
    {
        if ($active) {
            return $query->where('date_end', '>=', new Carbon())->OrWhereNull('date_end')->orWhereNull('date_start');
        }
        return $query->where('date_end', '<', new Carbon())->OrWhereNull('date_start');
    }

    public function scopeBirthday($query, $days = 14, $strict = false)
    {
        $query
            ->whereRaw('TIMESTAMPDIFF(day,NOW() + INTERVAL 15 DAY, readjustment_base_date) < ' . $days)
            ->whereRaw('TIMESTAMPDIFF(day,NOW() + INTERVAL 15 DAY, readjustment_base_date) > 0')
            ->where('date_end', '>', Carbon::now());
        return $query;
    }

    public function scopeBirthdayEquals($query, $days = 15)
    {
        $query
            ->whereRaw('TIMESTAMPDIFF(day,NOW() + INTERVAL 15 DAY, readjustment_base_date) = ' . $days)
            ->where('date_end', '>', Carbon::now());
        return $query;
    }

    public function scopeDeadline($query, $days = 35)
    {
        return $query
            ->whereRaw("TIMESTAMPDIFF(day,NOW() , date_end) > 0")
            ->whereRaw("TIMESTAMPDIFF(day,NOW() , date_end) <= $days")
            ->where('date_end', '>', Carbon::now());
    }

    public function scopeDeadlineEquals($query, $days = 35)
    {
        return $query
            ->whereRaw("TIMESTAMPDIFF(day,NOW() , date_end) = $days")
            ->where('date_end', '>', Carbon::now());
    }
}
