<?php

namespace App\Console\Commands;

use App\Mail\ProposalCommittee1;
use App\Models\Proposal;
use App\Models\User;
use App\Services\ProposalCommitteeOneService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class proposalCommitteeOneCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'proposal:committee-one {proposalId}';

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


        $proposal = Proposal::find($this->argument('proposalId'));
        $services  = new ProposalCommitteeOneService($proposal);
        $services->handle();
        return 0;
    }
}
