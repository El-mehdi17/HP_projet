<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    // 📌 GET ALL FACTURES
    public function index()
    {
        $factures = Facture::with('commande')->get();

        return response()->json($factures, 200);
    }

    // 📌 GET ONE FACTURE
    public function show($id)
    {
        $facture = Facture::with('commande')->find($id);

        if (!$facture) {
            return response()->json([
                'message' => 'Facture not found'
            ], 404);
        }

        return response()->json($facture, 200);
    }

    // 📌 CREATE FACTURE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_commande' => 'required|exists:commandes,id_commande',
            'total' => 'required|numeric',
            'date_facture' => 'required|date'
        ]);

        // 🔥 منع تكرار facture لنفس commande
        $exists = Facture::where('id_commande', $validated['id_commande'])->first();

        if ($exists) {
            return response()->json([
                'message' => 'Facture déjà existe pour cette commande'
            ], 400);
        }

        $facture = Facture::create($validated);

        return response()->json([
            'message' => 'Facture created successfully',
            'data' => $facture
        ], 201);
    }

    // 📌 UPDATE FACTURE
    public function update(Request $request, $id)
    {
        $facture = Facture::find($id);

        if (!$facture) {
            return response()->json([
                'message' => 'Facture not found'
            ], 404);
        }

        $validated = $request->validate([
            'id_commande' => 'sometimes|exists:commandes,id_commande',
            'total' => 'sometimes|numeric',
            'date_facture' => 'sometimes|date'
        ]);

        $facture->update($validated);

        return response()->json([
            'message' => 'Facture updated successfully',
            'data' => $facture
        ], 200);
    }

    // 📌 DELETE FACTURE
    public function destroy($id)
    {
        $facture = Facture::find($id);

        if (!$facture) {
            return response()->json([
                'message' => 'Facture not found'
            ], 404);
        }

        $facture->delete();

        return response()->json([
            'message' => 'Facture deleted successfully'
        ], 200);
    }
}