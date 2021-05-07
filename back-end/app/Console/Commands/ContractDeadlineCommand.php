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
    protected $signature = 'contract:deadline';

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
        $contracts = Contract::whereRaw('datediff(date_end, now()) <= ?', 15)
            ->whereRaw('datediff(date_end, now()) >= ?', 15)
            ->where('date_end', '>', Carbon::now())
            ->get();
        // $user = User::make(['email' => 'test@gmail.com', 'name' => 'asdasdas']);
        $users = User::withRoles('comercial')->get();
        Notification::send($users, new ContractDeadlineNotification($contracts));
        return 0;
    }
}
