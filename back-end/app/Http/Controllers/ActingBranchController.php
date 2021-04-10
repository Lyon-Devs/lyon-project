<?php

namespace App\Http\Controllers;

use App\Models\ActingBranch;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;
use PhpParser\ErrorHandler\Collecting;

class ActingBranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return ActingBranch::paginate($paginate);
    }

    public function allItens()
    {
        return ActingBranch::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, ActingBranch $actingBranch): ActingBranch
    {
        $request->validate([
            'name' => 'required',
        ]);
        $actingBranch->fill($request->all());
        $actingBranch->save();
        return $actingBranch;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ActingBranch  $actingBranch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ActingBranch $actingBranch): ActingBranch
    {
        $request->validate([
            'name' => 'required',
        ]);
        $actingBranch->fill($request->all());
        $actingBranch->save();
        return $actingBranch;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ActingBranch  $actingBranch
     * @return \Illuminate\Http\Response
     */
    public function destroy(ActingBranch $actingBranch): ActingBranch
    {
        $actingBranch->delete();
        return $actingBranch;
    }
}
