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
        $contracts = Contract::whereRaw("TIMESTAMPDIFF(day, date_start ,NOW() + INTERVAL $days DAY)%365 = 0")
            ->where('date_end', '>', Carbon::now())->get();
        if (count($contracts)) {
            $users = User::withRoles('comercial')->get();
            Notification::send($users, new ContractBirthdayNotification($contracts, $days));

            $managerUsers = [];
            $managerUsers[] = User::make(['name' => 'lyon', "email" => 'lyon@lyonengenharia.com.br']);
            foreach ($contracts as $contract) {
                $managerUsers[] = User::make(['name' => $contract->manager_lyon, "email" => $contract->manager_lyon_email]);
                $managerUsers[] = User::make(['name' => $contract->manager_client, "email" => $contract->manager_client_email]);
            }
            Notification::send($managerUsers, new ContractBirthdayNotification($contracts, $days));
        }
    }
}
