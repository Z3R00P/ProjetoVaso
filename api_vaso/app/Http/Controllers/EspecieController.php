<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEspecieRequest;
use App\Models\Especie;
use Illuminate\Http\Request;

class EspecieController extends Controller
{
    public function index()
    {
        $epecies = Especie::get();
        return response()->json($epecies);
    }
    public function create(StoreEspecieRequest $request)
    {
        try {
            $especie = Especie::create($request->validated());
            return response()->json([
                'success' => true,
                'especie' => $especie
            ], status: 201);
        } catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], status: 400);
        }
    }
    public function read($id)
    {
        try {
            $especie = Especie::findOrfail($id);
            return response()->json([
                'success' => true,
                'especie' => $especie
            ], status: 201);
        } catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], status: 404);
        }
    }
    public function update(StoreEspecieRequest $request, $id)
    {
        try {
            $especie = Especie::findOrFail($id);
            $especie->update($request->validated());
            return response()->json([
                'success' => true,
                'especie' => $especie
            ], status: 201);
        } catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], status: 404);
        }
    }
    public function delete($id)
    {
        try {
            $especie = Especie::destroy($id);
            return response()->json([
                'success' => true,
                'especie' => $especie
            ], status: 201);
        } catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], status: 404);
        }
    }
}
