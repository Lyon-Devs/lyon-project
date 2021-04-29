<?php

use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return view('reports.proposal');
    $pdf = PDF::loadView('reports.proposal');
    Storage::put('test.pdf', $pdf->output());
    // return $pdf->stream();
    // return $pdf->download('invoice.pdf');
})->name('password.reset');
