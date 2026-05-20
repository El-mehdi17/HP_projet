<?php

namespace App\Http\Controllers;

use App\Models\Livraison;
use Illuminate\Http\Request;

class LivraisonController extends Controller
{
    // 📌 GET ALL LIVRAISONS
    public function index()
    {
        $livraisons = Livraison::with('bonLivraison')->get();

        return response()->json($livraisons, 200);
    }

    // 📌 GET ONE LIVRAISON
    public function show($id)
    {
        $livraison = Livraison::with('bonLivraison')->find($id);

        if (!$livraison) {
            return response()->json([
                'message' => 'Livraison not found'
            ], 404);
        }

        return response()->json($livraison, 200);
    }

    // 📌 CREATE LIVRAISON
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_bl' => 'required|exists:bon_livraisons,id_bl',
            'date_livraison' => 'required|date',
            'type' => 'required|string|max:100',
            'status' => 'required|in:en_attente,en_cours,livree'
        ]);

        $livraison = Livraison::create($validated);

        return response()->json([
            'message' => 'Livraison created successfully',
            'data' => $livraison
        ], 201);
    }

    // 📌 UPDATE LIVRAISON
    public function update(Request $request, $id)
    {
        $livraison = Livraison::find($id);

        if (!$livraison) {
            return response()->json([
                'message' => 'Livraison not found'
            ], 404);
        }

        $validated = $request->validate([
            'id_bl' => 'sometimes|exists:bon_livraisons,id_bl',
            'date_livraison' => 'sometimes|date',
            'type' => 'nullable|string|max:100',
            'status' => 'sometimes|in:en_attente,en_cours,livree'
        ]);

        $livraison->update($validated);

        return response()->json([
            'message' => 'Livraison updated successfully',
            'data' => $livraison
        ], 200);
    }

    // 📌 DELETE LIVRAISON
    public function destroy($id)
    {
        $livraison = Livraison::find($id);

        if (!$livraison) {
            return response()->json([
                'message' => 'Livraison not found'
            ], 404);
        }

        $livraison->delete();

        return response()->json([
            'message' => 'Livraison deleted successfully'
        ], 200);
    }
}