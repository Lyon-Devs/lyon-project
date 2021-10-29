<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Proposal;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $contracts = Contract::where('date_end', '>', new Carbon())->count();
        $contractsInative = Contract::where('date_end', '<', new Carbon())->OrWhereNull('date_start')->count();
        $contractsDeadline = Contract::deadline(35)->get();
        $contractsBirthday = DB::table('contracts')
            ->selectRaw('TIMESTAMPDIFF(day,NOW() + INTERVAL 15 DAY, readjustment_base_date) as diffDays
            ')->whereRaw('date_end > NOW()')->whereRaw('TIMESTAMPDIFF(day,NOW() + INTERVAL 15 DAY, readjustment_base_date) > 0 and TIMESTAMPDIFF(day,NOW() + INTERVAL 15 DAY, readjustment_base_date) < 15')->get();
        $proposalPending = Proposal::where('status', 'draft')->count();
        $proposalCommittee1 = Proposal::where('status', 'committee_1')->count();
        $proposalCommittee2 = Proposal::where('status', 'committee_2')->count();
        $proposalWinner = Proposal::where('status', 'winner')->count();

        $data = [
            'contract_ative' => $contracts,
            'contract_inative' => $contractsInative,
            'contract_deadline' => count($contractsDeadline),
            'contract_birthday' => count($contractsBirthday),
            'proposal_pending' => $proposalPending,
            'proposal_committee_1' => $proposalCommittee1,
            'proposal_committee_2' => $proposalCommittee2,
            'proposal_winner' => $proposalWinner
        ];

        return $data;
    }
}
