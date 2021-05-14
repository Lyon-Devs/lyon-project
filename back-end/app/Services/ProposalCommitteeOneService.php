<?php

namespace App\Services;

use App\Mail\ProposalCommittee1;
use App\Models\Proposal;
use Illuminate\Support\Facades\Mail;

class ProposalCommitteeOneService
{
    private Proposal $proposal;
    public function __construct(
        Proposal $proposal = null
    ) {
        $this->proposal = $proposal;
    }

    public function handle(): void
    {
        $defaultEmails = env('DEFAULT_USER_COMMITTEE_1', null);
        $mainEmails = [];
        if ($defaultEmails) {
            $mainEmails = explode(';',  trim(preg_replace('/\s+/', ' ', ($defaultEmails))));
        }
        $proposal = $this->proposal;
        $emails = $proposal->typeService->emails;
        $mergeEmails = array_merge(count($mainEmails) ? $mainEmails : [], count($emails) ? $emails : []);
        Mail::to($mergeEmails)->send(new ProposalCommittee1($proposal));
    }
}
