<?php

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
