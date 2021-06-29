<?php

namespace App\Console\Commands;

use App\Models\Contract;
use App\Models\User;
use App\Notifications\ContractDeadlineNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class ContractDeadlineCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contract:deadline {days}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $days = $this->argument('days');
        $contracts = Contract::whereRaw('datediff(date_end, now()) <= ?', $days)
            ->whereRaw('datediff(date_end, now()) >= ?', $days)
            ->where('date_end', '>', Carbon::now())
            ->get();
        if (count($contracts)) {
            $users = User::withRoles('comercial')->get();
            Notification::send($users, new ContractDeadlineNotification($contracts, $days));

            $managerUsers = [];
            $managerUsers[] = User::make(['name' => 'lyon', "email" => 'lyon@lyonengenharia.com.br']);
            foreach ($contracts as $contract) {
                $managerUsers[] = User::make(['name' => $contract->manager_lyon, "email" => $contract->manager_lyon_email]);
            }
            Notification::send($managerUsers, new ContractDeadlineNotification($contracts, $days));
        }
        return 0;
    }
}
