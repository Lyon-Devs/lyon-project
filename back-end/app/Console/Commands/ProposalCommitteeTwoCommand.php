<?php

namespace App\Console\Commands;

use App\Mail\ProposalCommittee2;
use App\Models\Proposal;
use App\Services\ProposalCommitteeTwoService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class ProposalCommitteeTwoCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'proposal:committee-two {proposalId}';

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
        $services  = new ProposalCommitteeTwoService($proposal);
        $services->handle();
        return 0;
    }
}
