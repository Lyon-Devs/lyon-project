<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Proposal;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $contracts = Contract::where('date_end', '>', new Carbon())->count();
        $proposalPending = Proposal::where('status', 'draft')->count();
        $proposalCommittee1 = Proposal::where('status', 'committee_1')->count();
        $proposalCommittee2 = Proposal::where('status', 'committee_2')->count();

        $data = [
            'contract_ative' => $contracts,
            'proposal_pending' => $proposalPending,
            'proposal_committee_1' => $proposalCommittee1,
            'proposal_committee_2' => $proposalCommittee2
        ];

        return $data;
    }
}
