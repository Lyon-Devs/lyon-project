<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return Client::withActingBranches()->paginate($paginate);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Client $client): Client
    {
        $request->validate([
            'name' => "required",
            'acting_branches_id' => 'required|exists:acting_branches,id'
        ]);

        $client->fill($request->all());
        $client->save();
        return $client;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client): Client
    {
        $request->validate([
            'name' => "required",
            'acting_branches_id' => 'required|exists:acting_branches,id'
        ]);

        $client->fill($request->all());
        $client->save();
        return $client;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return $client;
    }

    public function allItens()
    {
        return Client::withActingBranches()->all();
    }
}
