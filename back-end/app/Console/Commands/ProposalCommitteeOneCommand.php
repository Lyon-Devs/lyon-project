<?php

namespace App\Console\Commands;

use App\Models\Proposal;
use App\Models\User;
use Illuminate\Console\Command;

class proposalCommitteeOneCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'proposal:committee-one';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a email to committee';

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

        $proposalCommittee1 = Proposal::where('status', 'committee_1')->get();
        $users = User::where()->get();


        return 0;
    }
}
