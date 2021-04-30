<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return Contract::with(['proposal'])->paginate($paginate);
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
            'center_of_cost' => "required",
            'contract_number' => "required",
            'purchase_order' => "required",
            'manager_lyon' => "required",
            'manager_lyon_email' => "required",
            'manager_client' => "required",
            'manager_client_email' => "required",
            'date_start' => "required",
            'date_end' => "required",
            'readjustment_base_date' => "required",
            'proposal_id' => "required"
        ]);
        $contract->fill($request->all());
        $contract->save();
        return $contract;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function show(Contract $contract)
    {
        return $contract->load(['proposal.buyer', 'proposal.client', 'proposal.typeService']);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contract $contract)
    {
        $request->validate([
            'center_of_cost' => "required",
            'contract_number' => "required",
            'purchase_order' => "required",
            'manager_lyon' => "required",
            'manager_lyon_email' => "required",
            'manager_client' => "required",
            'manager_client_email' => "required",
            'date_start' => "required",
            'date_end' => "required",
            'readjustment_base_date' => "required",
            'proposal_id' => "required"
        ]);
        $contract->fill($request->all());
        $contract->save();
        return $contract;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contract $contract)
    {
        $contract->delete();
        return $contract;
    }
}
