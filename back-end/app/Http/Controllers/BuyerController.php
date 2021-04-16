<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;

class BuyerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return Buyer::paginate($paginate);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Buyer $buyer): Buyer
    {
        $request->validate([
            'name' => 'required',
            'client_id' => 'required|exists:clients,id'
        ]);
        $buyer->fill($request->all());
        $buyer->save();
        return $buyer;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Buyer  $buyer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Buyer $buyer): Buyer
    {
        $request->validate([
            'name' => 'required',
            'client_id' => 'required|exists:clients,id'
        ]);
        $buyer->fill($request->all());
        $buyer->save();
        return $buyer;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Buyer  $buyer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Buyer $buyer)
    {
        $buyer->delete();
        return $buyer;
    }
    /**
     * list all itens
     */
    public function allItens()
    {
        return Buyer::all();
    }
}
