<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use Illuminate\Http\Request;

class InterventionController extends Controller
{
    // 📌 GET ALL (مع relations)
    public function index()
    {
        $interventions = Intervention::with([
            'commande',
            'technicien'
        ])->get();

        return response()->json($interventions, 200);
    }

    // 📌 GET ONE
    public function show($id)
    {
        $intervention = Intervention::with([
            'commande',
            'technicien'
        ])->find($id);

        if (!$intervention) {
            return response()->json([
                'message' => 'Intervention not found'
            ], 404);
        }

        return response()->json($intervention, 200);
    }

    // 📌 CREATE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_commande' => 'required|exists:commandes,id_commande',
            'id_technicien' => 'required|exists:techniciens,id_technicien',
            'date_intervention' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|in:en_attente,en_cours,terminee'
        ]);

        $intervention = Intervention::create($validated);

        return response()->json([
            'message' => 'Intervention created successfully',
            'data' => $intervention
        ], 201);
    }

    // 📌 UPDATE
    public function update(Request $request, $id)
    {
        $intervention = Intervention::find($id);

        if (!$intervention) {
            return response()->json([
                'message' => 'Intervention not found'
            ], 404);
        }

        $validated = $request->validate([
            'id_commande' => 'sometimes|exists:commandes,id_commande',
            'id_technicien' => 'sometimes|exists:techniciens,id_technicien',
            'date_intervention' => 'sometimes|date',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:en_attente,en_cours,terminee'
        ]);

        $intervention->update($validated);

        return response()->json([
            'message' => 'Intervention updated successfully',
            'data' => $intervention
        ], 200);
    }

    // 📌 DELETE
    public function destroy($id)
    {
        $intervention = Intervention::find($id);

        if (!$intervention) {
            return response()->json([
                'message' => 'Intervention not found'
            ], 404);
        }

        $intervention->delete();

        return response()->json([
            'message' => 'Intervention deleted successfully'
        ], 200);
    }
}