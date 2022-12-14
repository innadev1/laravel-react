<?php

use Illuminate\Support\Facades\Route;

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

//Route::get('/', function () {
//    return view('welcome');
//});

Auth::routes();

Route::get('/', array('before' => 'auth', 'uses' => 'HomeController@index'));
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/profile', 'ProfileController@index')->name('profile');
Route::get('/calendar', 'CalendarController@index')->name('calendar');
Route::get('/configurations', 'ConfigurationsController@index')->name('configurations');
Route::get('/segments', 'SegmentsController@index')->name('segments');
