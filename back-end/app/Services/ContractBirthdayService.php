<?php

namespace App\Services;

use App\Models\Contract;
use App\Models\User;
use App\Notifications\ContractBirthdayNotification;
use Illuminate\Support\Facades\Notification;

class ContractBirthdayService
{

    public function handle($days = 15): void
    {
        $contracts = Contract::birthdayEquals($days)->get();
        if (count($contracts)) {
            $users = User::withRoles('comercial')->get();
            Notification::send($users, new ContractBirthdayNotification($contracts, $days));

            $managerUsers = [];
            $managerUsers[] = User::make(['name' => 'lyon', "email" => 'lyon@lyonengenharia.com.br']);
            foreach ($contracts as $contract) {
                $managerUsers[] = User::make(['name' => $contract->manager_lyon, "email" => $contract->manager_lyon_email]);
            }
            if (count($managerUsers)) {
                Notification::send($managerUsers, new ContractBirthdayNotification($contracts, $days));
            }
        }
    }
}
