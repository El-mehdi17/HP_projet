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
            'nom'                  => 'required|string|max:255',
            'prenom'               => 'required|string|max:255',
            'cin'                  => 'nullable|string|max:20|unique:techniciens,cin',
            'specialite'           => 'nullable|string|max:255',
            'metier'               => 'nullable|string|max:255',
            'années_d_expérience'  => 'nullable|integer|min:0|max:50',
            'Prix'                 => 'nullable|integer|min:0',
            'image'                => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('techniciens', 'public');
        }

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
            return response()->json(['message' => 'Technicien not found'], 404);
        }

        $validated = $request->validate([
            'nom'                  => 'sometimes|string|max:255',
            'prenom'               => 'sometimes|string|max:255',
            'cin'                  => 'nullable|string|max:20|unique:techniciens,cin,' . $id,
            'specialite'           => 'nullable|string|max:255',
            'metier'               => 'nullable|string|max:255',
            'années_d_expérience'  => 'nullable|integer|min:0|max:50',
            'Prix'                 => 'nullable|integer|min:0',
            'image'                => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('techniciens', 'public');
        }

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