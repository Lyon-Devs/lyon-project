<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Models\ProposalRevision;
use Illuminate\Http\Request;

class ProposalRevisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Proposal $proposal)
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return $proposal->revisions()->paginate($paginate);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Proposal $proposal, ProposalRevision $proposalRevision)
    {
        $request->validate([
            'number_revision' => 'required',
            'data_committee' => 'required',
            'type_price' => 'required',
            'medium_histogram' => 'required',
            'global_price' => 'required',
            'gross_margin' => 'required',
            'bdi' => 'required',
            'taxes' => 'required',
            'charge' => 'required',
            'type_warning' => 'required',
            'risks' => 'required',
            'financial_taxis' => 'required',
            'proposal_id' => 'required | exists:proposals,id',
        ]);
        $proposalRevision->fill($request->all());
        $proposalRevision->save();
        $proposal = $proposalRevision->proposal;
        $proposal->status = 'committee_2';
        $proposal->save();
        return $proposalRevision;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProposalRevision  $proposalRevision
     * @return \Illuminate\Http\Response
     */
    public function show(ProposalRevision $proposalRevision)
    {
        return $proposalRevision->load(['client']);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProposalRevision  $proposalRevision
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proposal $proposal, ProposalRevision $proposalRevision)
    {
        $request->validate([
            'number_revision' => 'required',
            'data_committee' => 'required',
            'type_price' => 'required',
            'medium_histogram' => 'required',
            'global_price' => 'required',
            'gross_margin' => 'required',
            'bdi' => 'required',
            'taxes' => 'required',
            'charge' => 'required',
            'type_warning' => 'required',
            'risks' => 'required',
            'financial_taxis' => 'required',
            'proposal_id' => 'required | exists:proposals,id',
        ]);
        $proposalRevision->fill($request->all());
        $proposalRevision->save();
        return $proposalRevision;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProposalRevision  $proposalRevision
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proposal $proposal, ProposalRevision $proposalRevision)
    {
        $proposalRevision->delete();
        return $proposalRevision;
    }
}
