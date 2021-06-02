<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\ContractRenegotiation;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;

class ContractRenegotiationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Contract $contract): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return $contract->renegotiation()->paginate($paginate);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Contract $contract)
    {
        $request->validate([
            'contract_id' => 'required|exists:contracts,id',
            'year' => 'required',
            'purchasing_period' => 'required',
            'readjustment_base' => 'required',
            'required' => 'required',
            'approved' => 'required'
        ]);
        $data = $request->all();
        $data['number_renegotiation'] = count($contract->renegotiation) + 1;
        $contractRenegotiation = $contract->renegotiation()->create($data);
        return $contractRenegotiation;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ContractRenegotiation  $contractRenegotiation
     * @return \Illuminate\Http\Response
     */
    public function show(ContractRenegotiation $contractRenegotiation)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContractRenegotiation  $contractRenegotiation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  Contract $contract, ContractRenegotiation $contractRenegotiation)
    {
        $request->validate([
            'contract_id' => 'required|exists:contracts,id',
            'year' => 'required',
            'purchasing_period' => 'required',
            'readjustment_base' => 'required',
            'required' => 'required',
            'approved' => 'required'
        ]);

        $contractRenegotiation->fill($request->all());
        $contractRenegotiation->save();
        return $contractRenegotiation;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContractRenegotiation  $contractRenegotiation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contract $contract, ContractRenegotiation $contractRenegotiation)
    {
        $contractRenegotiation->delete();
        return $contractRenegotiation;
    }
}
