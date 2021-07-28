<?php

namespace App\Services;

use App\Mail\ProposalCommittee2;
use App\Models\Contract;
use App\Models\Proposal;
use App\Models\User;
use App\Notifications\ContractBirthdayNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Mail;

class ContractBirthdayService
{




    public function handle($days = 15): void
    {
        $diffDays = $days - 1;
        $contracts = Contract::whereRaw("TIMESTAMPDIFF(day, readjustment_base_date - INTERVAL $diffDays DAY ,NOW())%365 = $days")
            ->whereRaw("TIMESTAMPDIFF(day, readjustment_base_date - INTERVAL $diffDays DAY ,NOW())%365 > 0")
            ->whereRaw("TIMESTAMPDIFF(year, readjustment_base_date ,NOW()) > 0")
            ->where('date_end', '>', Carbon::now())
            ->get();
        if (count($contracts)) {
            $users = User::withRoles('comercial')->get();
            Notification::send($users, new ContractBirthdayNotification($contracts, $days));

            $managerUsers = [];
            $managerUsers[] = User::make(['name' => 'lyon', "email" => 'lyon@lyonengenharia.com.br']);
            foreach ($contracts as $contract) {
                $managerUsers[] = User::make(['name' => $contract->manager_lyon, "email" => $contract->manager_lyon_email]);
            }
            Notification::send($managerUsers, new ContractBirthdayNotification($contracts, $days));
        }
    }
}
