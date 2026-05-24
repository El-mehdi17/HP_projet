<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    // 📌 GET ALL COMMANDES (مع relations)
    public function index()
    {
        $commandes = Commande::with([
            'client',
            'facture',
            'bonLivraison',
            'commandeProduits',
            'interventions'
        ])->get();

        return response()->json($commandes, 200);
    }

    // 📌 GET ONE COMMANDE
    public function show($id)
    {
        $commande = Commande::with([
            'client',
            'facture',
            'bonLivraison',
            'commandeProduits',
            'interventions'
        ])->find($id);

        if (!$commande) {
            return response()->json([
                'message' => 'Commande not found'
            ], 404);
        }

        return response()->json($commande, 200);
    }

    // 📌 CREATE COMMANDE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_client' => 'required|exists:clients,id',
        ]);

        $validated['statut'] = 'en_attente';
        $commande = Commande::create($validated);

        return response()->json([
            'message' => 'Commande created successfully',
            'data' => $commande
        ], 201);
    }

    // 📌 UPDATE COMMANDE
    public function update(Request $request, $id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json([
                'message' => 'Commande not found'
            ], 404);
        }

        $validated = $request->validate([
            'id_client' => 'sometimes|exists:clients,id_client',
            'description' => 'nullable|string',
            'date_commande' => 'sometimes|date'
        ]);

        $commande->update($validated);

        return response()->json([
            'message' => 'Commande updated successfully',
            'data' => $commande
        ], 200);
    }

    // 📌 DELETE COMMANDE
    public function destroy($id)
    {
        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json([
                'message' => 'Commande not found'
            ], 404);
        }

        $commande->delete();

        return response()->json([
            'message' => 'Commande deleted successfully'
        ], 200);
    }
}