<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//User controller
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('user', 'Api\UserController');
Route::post('user/{id}', 'Api\UserController@update');
//Form Controller
Route::resource('form', 'Api\FormController');
Route::post('form/add', 'Api\FormController@store');
Route::post('form/{id}', 'Api\FormController@updateDates');
Route::post('form/updateStatus/{id}', 'Api\FormController@updateStatus');
Route::post('form/edit/{id}', 'Api\FormController@edit');
Route::post('form/destroy/{id}', 'Api\FormController@destroy');
//Brand controller
Route::resource('brand', 'Api\BrandController');
Route::post('brand/destroy/{id}', 'Api\BrandController@destroy');
Route::post('brand/add', 'Api\BrandController@store');
Route::post('brand/{id}', 'Api\BrandController@update');
//Domain controller
Route::resource('domain', 'Api\DomainController');
Route::post('domain/destroy/{id}', 'Api\DomainController@destroy');
Route::post('domain/add', 'Api\DomainController@store');
Route::post('domain/{id}', 'Api\DomainController@update');
//Language controller
Route::resource('language', 'Api\LanguageController');
Route::post('language/destroy/{id}', 'Api\LanguageController@destroy');
Route::post('language/add', 'Api\LanguageController@store');
Route::post('language/{id}', 'Api\LanguageController@update');
//Product controller
Route::resource('product', 'Api\ProductController');
Route::post('product/destroy/{id}', 'Api\ProductController@destroy');
Route::post('product/add', 'Api\ProductController@store');
Route::post('product/{id}', 'Api\ProductController@update');
//Upload files
Route::post('file/upload', 'Api\FileUploadController@uploadFile');
//Segment controller
//Folders
Route::resource('folder', 'Api\FolderController');
Route::post('folder/storeFolder', 'Api\FolderController@storeFolder');
Route::post('folder/editFolder/{id}', 'Api\FolderController@editFolder');
Route::post('folder/destroyFolder/{id}', 'Api\FolderController@destroyFolder');
Route::post('folder/moveFolder/{id}', 'Api\FolderController@moveFolder');
//Groups
Route::post('group/storeGroup', 'Api\GroupController@storeGroup');
Route::post('group/editGroup/{id}', 'Api\GroupController@editGroup');
Route::post('group/destroyGroup/{id}', 'Api\GroupController@destroyGroup');
Route::post('group/moveGroup/{id}', 'Api\GroupController@moveGroup');
//Customers
Route::post('customer/storeCustomer', 'Api\CustomerController@storeCustomer');
Route::post('customer/editCustomer/{id}', 'Api\CustomerController@editCustomer');
Route::post('customer/destroyCustomer/{id}', 'Api\CustomerController@destroyCustomer');
