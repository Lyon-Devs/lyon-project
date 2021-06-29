<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\ContractAdditive;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;

class ContractAdditiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Contract $contract): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return $contract->additives()->paginate($paginate);
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
            'type' => 'required',
            'date_start' => 'required',
            'date_end' => 'required',
            'description' => 'required',
            'contract_id' => 'required|exists:contracts,id'
        ]);
        if ($request->has('deadline')) {
            if (!empty($request->get('deadline'))) {
                $contract->date_end = $request->get('deadline');
                $contract->save();
            }
        }
        $data = $request->all();
        $data['number_additive'] = count($contract->additives) + 1;
        $additives = $contract->additives()->create($data);
        return $additives;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return \Illuminate\Http\Response
     */
    public function show(ContractAdditive $contractAdditive)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contract $contract,  ContractAdditive $contractAdditive)
    {
        $request->validate([
            'type' => 'required',
            'date_start' => 'required',
            'date_end' => 'required',
            'description' => 'required',
            'contract_id' => 'required|exists:contracts,id'
        ]);
        if ($request->has('deadline')) {
            if (!empty($request->get('deadline'))) {
                $contract->date_end = $request->get('deadline');
                $contract->save();
            }
        }
        $contractAdditive->fill($request->all());
        $contractAdditive->save();
        return $contractAdditive;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContractAdditive  $contractAdditive
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contract $contract, ContractAdditive $contractAdditive)
    {
        $contractAdditive->delete();
        return $contractAdditive;
    }
}
