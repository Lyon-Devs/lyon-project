<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Models\ProposalFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProposalFilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(Request $request, Proposal $proposal)
    {
        foreach ($request->files as $file) {
            $path = "{$proposal->cod_lyon}/{$file->getClientOriginalName()}";
            Storage::disk('public')->put($path, \File::get($file->getRealPath()));
            $proposal->files()->updateOrCreate([
                'name' => $file->getClientOriginalName(),
                'path' => $path
            ]);
        }
        return $proposal->files;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProposalFiles  $proposalFiles
     * @return \Illuminate\Http\Response
     */
    public function show(ProposalFiles $proposalFiles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProposalFiles  $proposalFiles
     * @return \Illuminate\Http\Response
     */
    public function edit(ProposalFiles $proposalFiles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProposalFiles  $proposalFiles
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProposalFiles $proposalFiles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProposalFiles  $proposalFiles
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proposal $proposal, ProposalFiles $proposalFiles)
    {
        // dd($proposalFiles);
        // Storage::disk('public')->delete($proposalFiles->path);
        $proposalFiles->delete();
        return $proposalFiles;
    }
}
