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

    public function scopeBirthday($query, $days = 14)
    {
        $daysMinor = $days - 1;
        return $query
            ->whereRaw("TIMESTAMPDIFF(day, readjustment_base_date - INTERVAL $daysMinor DAY ,NOW())%365 <= $days")
            ->whereRaw("TIMESTAMPDIFF(day, readjustment_base_date - INTERVAL $daysMinor DAY ,NOW())%365 > 0")
            ->whereRaw("TIMESTAMPDIFF(year, readjustment_base_date ,NOW()) > 0")
            ->where('date_end', '>', Carbon::now());
    }

    public function scopeDeadline($query, $days = 35)
    {
        return $query->whereRaw('datediff(date_end, now()) <= ?', $days);
    }
}
