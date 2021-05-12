<?php

namespace App\Console\Commands;

use App\Mail\ProposalCommittee2;
use App\Models\Proposal;
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
    protected $signature = 'proposal:committee-two';

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
        $today = new Carbon();
        $proposalCommittee1 = Proposal::where('status', 'committee_2')->where('updated_at', '>=', $today->subHours(24))->get();
        foreach ($proposalCommittee1 as $proposal) {
            $emails = $proposal->ownersComercial->load('user');
            $emails = $emails->pluck('user.email');
            Mail::to($emails)->send(new ProposalCommittee2($proposal));
        }
        return 0;
    }
}
