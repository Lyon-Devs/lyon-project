<?php

namespace App\Observers;

use App\Models\Proposal;
use App\Services\ProposalCommitteeOneService;
use App\Services\ProposalCommitteeTwoService;

class ProposalObserver
{
    public function created(Proposal $proposal)
    {
        $clientId = str_pad($proposal->client->code, 4, "0", STR_PAD_LEFT);
        $proposalIdFilled = str_pad($proposal->id, 6, "0", STR_PAD_LEFT);
        $year = date('Y');
        $proposal->cod_lyon = "LY-$clientId-$proposalIdFilled-$year";
        $proposal->save();
    }


    public function updated(Proposal $proposal)
    {

        if ($proposal->isDirty('status')) {
            if ($proposal->status === 'committee_1') {
                $services  = new ProposalCommitteeOneService($proposal);
                $services->handle();
            } elseif ($proposal->status === 'committee_2') {
                $services  = new ProposalCommitteeTwoService($proposal);
                $services->handle();
            } elseif ($proposal->status === 'winner') {
                if (count($proposal->contracts) === 0) {
                    $proposal->contracts()->create();
                }
            }
        }
    }
}
