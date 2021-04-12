<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
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
        return Proposal::paginate($paginate);
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
            'buyer' => 'required',
            'number_client_request' => 'required',
            'cod_lyon' => 'required',
            'date_request' => 'required',
            'date_delivery_comercial_proposal' => 'required',
            'owner_technique_proposal' => 'required',
            'owner_comercial_proposal' => 'required',
            'summary_scope' => 'required',
            'scope' => 'required',
            'months_exec' => 'required',
            'date_delivery_technique_proposal' => 'required',
            'date_technique_visit' => 'required',
            'local_technique_visit' => 'required',
            'details_technique_visit' => 'required',
            'comercial_delivery' => 'required',
            'place_to_deploys_services' => 'required',
            'contract_time' => 'required',
            'deadline_confirme' => 'required',
            'medium_histogram' => 'required',
            'observations' => 'required',
            'status' => 'required',
            'users' => 'required'
        ]);
        $proposal->fill($request->all());
        $proposal->save();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proposal $proposal)
    {
        $this->proposal->delete();
        return $this->proposal;
    }
}
