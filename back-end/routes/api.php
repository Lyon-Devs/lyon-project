<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ActingBranchController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\TypeServiceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProposalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



Route::get('/', function () {
    return 'ok';
});

Route::get('/teste', function () {
    return 'ok teste';
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('acting/branch/all', [ActingBranchController::class, 'allItens'])->name('branch.all');
Route::get('acting/branch', [ActingBranchController::class, 'index'])->name('branch.index');
Route::get('type/service', [TypeServiceController::class, 'index'])->name('service.index');
Route::get('client', [ClientController::class, 'index'])->name('client.index');
Route::get('client/all', [ClientController::class, 'allItens'])->name('client.all');
Route::get('buyer/all', [BuyerController::class, 'allItens'])->name('buyer.all');
Route::get('buyer', [BuyerController::class, 'index'])->name('client.index');
// 'auth:api', 'role:administrator'

Route::middleware(['auth:api', 'role:admin,comercial'])->group(function () {
    $exceptActions = ['index', 'edit'];
    Route::get('users/all', [UserController::class, 'allItens'])->name('user.all');
    Route::resource('acting/branch', ActingBranchController::class)->except([
        'index', 'edit'
    ])->parameters([
        'branch' => 'actingBranch'
    ]);

    Route::resource('proposal', ProposalController::class)->except($exceptActions);
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
