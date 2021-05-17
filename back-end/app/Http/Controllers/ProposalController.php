<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

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
        return QueryBuilder::for(Proposal::class)
            ->allowedFilters([
                AllowedFilter::exact('status'),
                AllowedFilter::partial('cod_lyon'),
            ])
            ->with([
                'client', 'typeService', 'owners.user', 'files'
            ])->paginate($paginate);
    }

    public function allItens()
    {
        return Proposal::all();
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
            'type_service_id' => 'required',
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
                $proposal->owners()->updateOrInsert([
                    'user_id' => $user['id'],
                    'type' => 'technical',
                    'proposal_id' => $proposal->id
                ]);
            }
        }
        if ($request->has('selectedUserCom')) {
            foreach ($request->selectedUserCom as $user) {
                $proposal->owners()->updateOrInsert([
                    'user_id' => $user['id'],
                    'type' => 'comercial',
                    'proposal_id' => $proposal->id
                ]);
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
        return $proposal->load(['client', 'buyer', 'typeService', 'users']);
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
            'type_service_id' => 'required',
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

        if ($request->has('selectedUserTec')) {
            $userProposal = $proposal->ownersTechnical;

            $userProposal->each(function ($user) use ($proposal) {
                $user->delete();
            });

            foreach ($request->selectedUserTec as $user) {
                if (isset($user['id'])) {
                    $proposal->owners()->updateOrInsert([
                        'user_id' => $user['id'],
                        'type' => 'technical',
                        'proposal_id' => $proposal->id
                    ]);
                }
            }
        }
        if ($request->has('selectedUserCom')) {
            $userProposal = $proposal->ownersComercial;
            $userProposal->each(function ($user) use ($proposal) {
                $user->delete();
            });
            foreach ($request->selectedUserCom as $user) {
                if (isset($user['id'])) {
                    $proposal->owners()->updateOrInsert([
                        'user_id' => $user['id'],
                        'type' => 'comercial',
                        'proposal_id' => $proposal->id
                    ]);
                }
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
