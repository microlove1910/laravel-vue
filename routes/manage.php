<?php

use Illuminate\Support\Facades\Route;


Route::namespace('Manage')->group(function () {
    Route::post('/login', 'AuthController@login');
    Route::group(['middleware' => 'auth:manage'], function () {
        Route::get('/user/info', 'AuthController@user');
        Route::post('/logout', 'AuthController@logout');
    });
});
