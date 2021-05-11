<?php

namespace App\Console\Commands;

use App\Mail\ProposalCommittee1;
use App\Models\Proposal;
use App\Models\User;
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

        $defaultEmails = env('DEFAULT_USER_COMMITTEE_1', null);
        $mainEmails = [];
        if ($defaultEmails) {
            $mainEmails = explode(';', $defaultEmails);
        }
        $today = new Carbon();
        $proposalCommittee1 = Proposal::where('status', 'committee_1')->where('updated_at', '>=', $today->subHours(24))->get();
        foreach ($proposalCommittee1 as $proposal) {
            $emails = $proposal->typeService->emails;
            $mergeEmails = array_merge(count($mainEmails) ? $mainEmails : [], count($emails) ? $emails : []);
            Mail::to($mergeEmails)->send(new ProposalCommittee1($proposal));
        }
        return 0;
    }
}
