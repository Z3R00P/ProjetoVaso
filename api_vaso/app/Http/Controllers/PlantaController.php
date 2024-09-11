<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantaRequest;
use App\Models\Planta;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class PlantaController extends Controller
{
    public function index()
    {
        $plantas = Planta::with('especie')->get();
        return response()->json($plantas);
    }
    public function create(StorePlantaRequest $request)
    {
        try {
            $planta = Planta::create($request->validated());
            return response()->json([
                'sucess' => true,
                'planta' => $planta
            ], status: 201);
        } catch (\Exception $e) {
            return response()->json([
                'sucess' => false,
                'message' => $e->getMessage()
            ], status: 400);
        }
    }
    public function read($id)
    {
        try {
            $planta = Planta::findOrfail($id);
            return response()->json([
                'sucess' => true,
                'data' => $planta
            ], status: 201);
        } catch (ModelNotFoundException) {
            return response()->json([
                'sucess' => false,
                'message' => "Planta no encontrada"
            ], status: 404);
        }
    }
    public function update(StorePlantaRequest $request, $id)
    {
        try {
            $planta = Planta::findOrFail($id);
            $planta->update($request->validated());
            return response()->json([
                'sucess' => true,
                'planta' => $planta
            ], status: 201);
        } catch (\Exception $e)
        {
            return response()->json([
                'sucess' => false,
                'message' => $e->getMessage()
            ], status: 404);
        }
    }
    public function delete($id)
    {
        try {
            $planta = Planta::destroy($id);
            return response()->json([
                'sucess' => true,
                'planta' => $planta
            ], status: 201);
        } catch (\Exception $e)
        {
            return response()->json([
                'sucess' => false,
                'message' => $e->getMessage()
            ], status: 404);
        }
    }
}
