<?php

namespace App\Http\Controllers;

use App\Models\TypeService;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Http\Request;

class TypeServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Paginator
    {
        $paginate = $request->has('per_page') ? $request->per_page : 20;
        return TypeService::paginate($paginate);
    }

    /**
     * Create the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TypeService  $typeService
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, TypeService $typeService): TypeService
    {
        $request->validate([
            'name' => 'required',
            'unity_business' => 'required',
            'email_group' => 'required',
        ]);
        $typeService->fill($request->all());
        $typeService->save();
        return $typeService;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TypeService  $typeService
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TypeService $typeService)
    {
        $request->validate([
            'name' => 'required',
            'unity_business' => 'required',
            'email_group' => 'required',
        ]);
        $typeService->fill($request->all());
        $typeService->save();
        return $typeService;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TypeService  $typeService
     * @return \Illuminate\Http\Response
     */
    public function destroy(TypeService $typeService): TypeService
    {
        $typeService->delete();
        return $typeService;
    }
}
