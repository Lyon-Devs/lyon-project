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
        $contractsInative = Contract::where('date_end', '<', new Carbon())->count();
        $contractsDeadline = Contract::whereRaw('datediff(date_end, now()) <= ?', 35)
            ->where('date_end', '>', Carbon::now())
            ->count();
        $contractsBirthday = Contract::whereRaw("TIMESTAMPDIFF(day, readjustment_base_date - INTERVAL 14 DAY ,NOW())%365 <= 15")
            ->whereRaw("TIMESTAMPDIFF(day, readjustment_base_date - INTERVAL 14 DAY ,NOW())%365 > 0")
            ->whereRaw("TIMESTAMPDIFF(year, readjustment_base_date ,NOW()) > 0")
            ->where('date_end', '>', Carbon::now())
            ->count();


        $proposalPending = Proposal::where('status', 'draft')->count();
        $proposalCommittee1 = Proposal::where('status', 'committee_1')->count();
        $proposalCommittee2 = Proposal::where('status', 'committee_2')->count();
        $proposalWinner = Proposal::where('status', 'winner')->count();

        $data = [
            'contract_ative' => $contracts,
            'contract_inative' => $contractsInative,
            'contract_deadline' => $contractsDeadline,
            'contract_birthday' => $contractsBirthday,
            'proposal_pending' => $proposalPending,
            'proposal_committee_1' => $proposalCommittee1,
            'proposal_committee_2' => $proposalCommittee2,
            'proposal_winner' => $proposalWinner
        ];

        return $data;
    }
}
