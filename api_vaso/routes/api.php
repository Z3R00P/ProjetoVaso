<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/plantas', [\App\Http\Controllers\PlantaController::class, 'index']);
Route::post('/plantas', [\App\Http\Controllers\PlantaController::class, 'create']);
Route::get('/planta/{id}', [\App\Http\Controllers\PlantaController::class, 'read']);
Route::put('/planta/{id}', [\App\Http\Controllers\PlantaController::class, 'update']);
Route::delete('/planta/{id}', [\App\Http\Controllers\PlantaController::class, 'delete']);

Route::get('/especies', [\App\Http\Controllers\EspecieController::class, 'index']);
Route::post('/especies', [\App\Http\Controllers\EspecieController::class, 'create']);
Route::get('/especie/{id}', [\App\Http\Controllers\EspecieController::class, 'read']);
Route::put('/especie/{id}', [\App\Http\Controllers\EspecieController::class, 'update']);
Route::delete('/especie/{id}', [\App\Http\Controllers\EspecieController::class, 'delete']);

Route::get('/parametros', [\App\Http\Controllers\ParametroController::class, 'index']);
Route::post('/parametros', [\App\Http\Controllers\ParametroController::class, 'create']);
Route::put('/parametro/{id}', [\App\Http\Controllers\ParametroController::class, 'update']);
Route::delete('/parametro/{id}', [\App\Http\Controllers\ParametroController::class, 'delete']);
