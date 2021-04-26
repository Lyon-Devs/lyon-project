<?php

namespace App\Http\Controllers;

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
    public function index(Request $request): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return ContractAdditive::paginate($paginate);
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
    public function store(Request $request, ContractAdditive $contractAdditive)
    {
        $request->require([
            'number_additive' => 'required',
            'type' => 'required',
            'date_start' => 'required',
            'date_end' => 'required',
            'value' => 'required',
            'description' => 'required',
            'contract_id' => 'required|exists:contracts,id'
        ]);

        $contractAdditive->fill($request->all());
        $contractAdditive->save();
        return $contractAdditive;
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
    public function update(Request $request, ContractAdditive $contractAdditive)
    {
        $request->require([
            'number_additive' => 'required',
            'type' => 'required',
            'date_start' => 'required',
            'date_end' => 'required',
            'value' => 'required',
            'description' => 'required',
            'contract_id' => 'required|exists:contracts,id'
        ]);

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
    public function destroy(ContractAdditive $contractAdditive)
    {
        $contractAdditive->delete();
        return $contractAdditive;
    }
}
