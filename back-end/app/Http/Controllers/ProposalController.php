<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return Proposal::with([
            'client', 'actingBranch', 'users'
        ])->paginate($paginate);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Proposal $proposal)
    {
        $request->validate([
            'acting_branch_id' => 'required',
            'buyer_id' => 'required',
            'client_id' => 'required|exists:clients,id',
            'date_delivery_comercial_proposal' => 'date',
            'date_delivery_technique_proposal' => 'date',
            'date_request'  => 'date',
            'date_technique_visit'  => 'date',
            'deadline_date_confirme'  => 'date',
            'deadline_time_confirme'  => 'date_format:"His"',
            'time_technique_visit'  => 'date_format:"His"',

        ]);
        $proposal->fill($request->all());
        $proposal->save();

        if ($request->has('selectedUserTec')) {
            foreach ($request->selectedUserTec as $user) {
                $hasUser = User::find($user['id']);
                $proposal->users()->attach($hasUser);
            }
        }
        if ($request->has('selectedUserCom')) {
            foreach ($request->selectedUserCom as $user) {
                $hasUser = User::find($user['id']);
                $proposal->users()->attach($hasUser);
            }
        }

        return $proposal;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function show(Proposal $proposal)
    {
        return $proposal;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proposal $proposal)
    {

        $request->validate([
            'acting_branch_id' => 'required',
            'buyer_id' => 'required',
            'client_id' => 'required|exists:clients,id',
            'date_delivery_comercial_proposal' => 'date',
            'date_delivery_technique_proposal' => 'date',
            'date_request'  => 'date',
            'date_technique_visit'  => 'date',
            'deadline_date_confirme'  => 'date',
            'deadline_time_confirme'  => 'date_format:"His"',
            'time_technique_visit'  => 'date_format:"His"',
            'status' => 'required'

        ]);
        $proposal->fill($request->all());
        $proposal->save();

        $userProposal = $proposal->users;
        if ($request->has('selectedUserTec')) {
            $userProposal->each(function ($user) use ($proposal) {
                if ($user->hasRole('technical')) {
                    $proposal->users()->detach($user);
                }
            });
            foreach ($request->selectedUserTec as $user) {
                $hasUser = User::find($user['id']);
                $proposal->users()->attach($hasUser);
            }
        }
        if ($request->has('selectedUserCom')) {
            $userProposal->each(function ($user) use ($proposal) {
                if ($user->hasRole('comercial')) {
                    $proposal->users()->detach($user);
                }
            });
            foreach ($request->selectedUserCom as $user) {
                $hasUser = User::find($user['id']);
                $proposal->users()->attach($hasUser);
            }
        }

        return $proposal;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proposal $proposal)
    {
        $proposal->delete();
        return $proposal;
    }
}
