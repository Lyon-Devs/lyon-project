<?php

namespace App\Services;

use App\Mail\ProposalCommittee2;
use App\Models\Proposal;
use Illuminate\Support\Facades\Mail;

class ProposalCommitteeTwoService
{
    private Proposal $proposal;
    public function __construct(
        Proposal $proposal = null
    ) {
        $this->proposal = $proposal;
    }

    public function handle(): void
    {
        $proposal = $this->proposal;

        $emails = $proposal->ownersComercial->load('user');
        $emails = $emails->pluck('user.email');
        Mail::to($emails)->send(new ProposalCommittee2($proposal));
    }
}
