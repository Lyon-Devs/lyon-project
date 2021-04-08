<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ActingBranchController;
use App\Http\Controllers\TypeServiceController;
use App\Http\Controllers\ClientController;
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

// 'auth:api', 'role:administrator'
Route::middleware(['auth:api', 'role:administrator'])->group(function () {
    Route::resource('users', UserController::class)->except('edit');
});
Route::middleware(['auth:api', 'role:administrator,comercial'])->group(function () {
    Route::resource('acting/branch', ActingBranchController::class)->except([
        'index', 'edit'
    ]);
    Route::resource('type/service', TypeServiceController::class)->except([
        'index', 'edit'
    ]);
    Route::resource('client', ClientController::class)->except([
        'index', 'edit'
    ]);
});
Route::get('acting/branch', [ActingBranchController::class, 'index'])->name('branch.index');
Route::get('type/service', [TypeServiceController::class, 'index'])->name('service.index');
Route::get('client', [ClientController::class, 'index'])->name('client.index');

Route::middleware(['auth:api', 'role:administrator'])->get('/role/admin', function (Request $request) {
    return 'welcome administrator';
});

Route::middleware(['auth:api', 'role:comercial'])->get('/role/comer', function (Request $request) {
    return 'welcome comercial';
});

Route::middleware(['auth:api', 'role:user'])->get('/role/user', function (Request $request) {
    return 'welcome user';
});

require __DIR__ . '/auth.php';
