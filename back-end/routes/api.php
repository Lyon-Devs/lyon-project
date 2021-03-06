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
use App\Mail\ProposalCommittee2;
use App\Models\Contract;
use App\Models\Proposal;
use App\Models\User;
use App\Notifications\ContractDeadlineNotification;
use App\Services\ProposalCommitteeOneService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
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
    $proposal = Proposal::find(1);
    // $services  = new ProposalCommitteeOneService($proposal);
    $services = new ProposalCommittee2($proposal);
    return $services;
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

Route::middleware(['auth:api', 'role:admin|comercial'])->group(function () {
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
    Route::resource('proposal.revision', ProposalRevisionController::class)->except(['edit'])->parameters([
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

require __DIR__ . '/auth.php';
