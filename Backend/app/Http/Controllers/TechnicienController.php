<?php

namespace App\Http\Controllers;

use App\Models\Technicien;
use Illuminate\Http\Request;

class TechnicienController extends Controller
{
    // 📌 GET ALL TECHNICIENS
    public function index()
    {
        $techniciens = Technicien::all();

        return response()->json($techniciens, 200);
    }

    // 📌 GET ONE TECHNICIEN
    public function show($id)
    {
        $technicien = Technicien::find($id);

        if (!$technicien) {
            return response()->json([
                'message' => 'Technicien not found'
            ], 404);
        }

        return response()->json($technicien, 200);
    }

    // 📌 CREATE TECHNICIEN
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:techniciens,email',
            'telephone' => 'nullable|string|max:20',
            'specialite' => 'nullable|string|max:255'
        ]);

        $technicien = Technicien::create($validated);

        return response()->json([
            'message' => 'Technicien created successfully',
            'data' => $technicien
        ], 201);
    }

    // 📌 UPDATE TECHNICIEN
    public function update(Request $request, $id)
    {
        $technicien = Technicien::find($id);

        if (!$technicien) {
            return response()->json([
                'message' => 'Technicien not found'
            ], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:techniciens,email,' . $id . ',id_technicien',
            'telephone' => 'nullable|string|max:20',
            'specialite' => 'nullable|string|max:255'
        ]);

        $technicien->update($validated);

        return response()->json([
            'message' => 'Technicien updated successfully',
            'data' => $technicien
        ], 200);
    }

    // 📌 DELETE TECHNICIEN
    public function destroy($id)
    {
        $technicien = Technicien::find($id);

        if (!$technicien) {
            return response()->json([
                'message' => 'Technicien not found'
            ], 404);
        }

        $technicien->delete();

        return response()->json([
            'message' => 'Technicien deleted successfully'
        ], 200);
    }
}