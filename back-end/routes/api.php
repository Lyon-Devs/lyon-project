<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ActingBranchController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\TypeServiceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractAdditiveController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ContractRenegotiationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ProposalFilesController;
use App\Http\Controllers\ProposalRevisionController;
use App\Mail\ProposalCommittee1;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('test', function () {
    $defaultEmails = env('DEFAULT_USER_COMMITTEE_1', null);
    $mainEmails = [];
    if ($defaultEmails) {
        $mainEmails = explode(',', $defaultEmails);
    }


    $today = new Carbon();
    $proposalCommittee1 = Proposal::where('status', 'committee_1')->where('updated_at', '>=', $today->subHours(24))->get();
    foreach ($proposalCommittee1 as $proposal) {
        $emails = $proposal->typeService->emails;
        $mergeEmails = array_merge(count($mainEmails) ? $mainEmails : [], count($emails) ? $emails : []);

        dd($mergeEmails);
        // $pdf = PDF::loadView('reports.proposal', ['proposal' => $proposal]);
        // $fileName = $proposal->cod_lyon . '.pdf';
        // Storage::disk('private')->put($fileName, $pdf->output());
        // $file = storage_path('app/private/' . $fileName);
        // $email = new ProposalCommittee1($proposal);
        // return $email->render();
        Mail::to($emails)->send(new ProposalCommittee1($proposal));
    }
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('acting/branch/all', [ActingBranchController::class, 'allItens'])->name('branch.all');
Route::get('acting/branch', [ActingBranchController::class, 'index'])->name('branch.index');
Route::get('type/service/all', [TypeServiceController::class, 'allItens'])->name('service.all');
Route::get('type/service', [TypeServiceController::class, 'index'])->name('service.index');
Route::get('client', [ClientController::class, 'index'])->name('client.index');
Route::get('client/all', [ClientController::class, 'allItens'])->name('client.all');
Route::get('buyer/all', [BuyerController::class, 'allItens'])->name('buyer.all');
Route::get('buyer', [BuyerController::class, 'index'])->name('client.index');
Route::get('home/all', [HomeController::class, 'index'])->name('home.all');
Route::get('proposal/{proposal}/files/{proposalFiles}', [ProposalFilesController::class, 'show']);
// 'auth:api', 'role:administrator'

Route::middleware(['auth:api', 'role:admin,comercial'])->group(function () {
    $exceptActions = ['index', 'edit'];
    Route::get('users/all', [UserController::class, 'allItens'])->name('user.all');
    Route::resource('acting/branch', ActingBranchController::class)->except([
        'index', 'edit'
    ])->parameters([
        'branch' => 'actingBranch'
    ]);
    Route::resource('proposal.files', ProposalFilesController::class)->except(['edit', 'show'])
        ->parameters([
            'proposal' => 'proposal',
            'files' => 'proposalFiles'
        ]);
    Route::resource('proposal/revision', ProposalRevisionController::class)->except(['edit'])->parameters([
        'revision' => 'proposalRevision'
    ]);


    Route::get('proposal/all', [ProposalController::class, 'allItens'])->name('proposal.all');

    Route::resource('contract', ContractController::class)->except(['edit']);
    Route::resource('contract.additive', ContractAdditiveController::class)->except(['edit'])
        ->parameters([
            'contract' => 'contract',
            'additive' => 'contractAdditive'
        ]);
    Route::resource('contract.renegotiation', ContractRenegotiationController::class)->except(['edit'])
        ->parameters([
            'contract' => 'contract',
            'renegotiation' => 'contractRenegotiation'
        ]);
    Route::resource('proposal', ProposalController::class)->except(['edit']);
    Route::resource('buyer', BuyerController::class)->except($exceptActions);

    Route::resource('type/service', TypeServiceController::class)->except($exceptActions)
        ->parameters([
            'service' => 'typeService'
        ]);

    Route::resource('client', ClientController::class)->except($exceptActions);
});

Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::resource('users', UserController::class)->except('edit');
});

Route::middleware(['auth:api', 'role:admin'])->get('/role/admin', function (Request $request) {
    return 'welcome administrator';
});

Route::middleware(['auth:api', 'role:comercial'])->get('/role/comer', function (Request $request) {
    return 'welcome comercial';
});

Route::middleware(['auth:api', 'role:user'])->get('/role/user', function (Request $request) {
    return 'welcome user';
});

require __DIR__ . '/auth.php';
