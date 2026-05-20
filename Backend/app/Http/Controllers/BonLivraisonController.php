<?php

namespace App\Http\Controllers;

use App\Models\BonLivraison;
use Illuminate\Http\Request;

class BonLivraisonController extends Controller
{
    // 📌 GET ALL
    public function index()
    {
        $data = BonLivraison::with([
            'commande',
            'livraisons'
        ])->get();

        return response()->json($data, 200);
    }

    // 📌 GET ONE
    public function show($id)
    {
        $item = BonLivraison::with([
            'commande',
            'livraisons'
        ])->find($id);

        if (!$item) {
            return response()->json([
                'message' => 'BonLivraison not found'
            ], 404);
        }

        return response()->json($item, 200);
    }

    // 📌 CREATE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_commande' => 'required|exists:commandes,id_commande',
            'date_livraison' => 'required|date'
        ]);

        // 🔥 منع تكرار BL لنفس commande
        $exists = BonLivraison::where('id_commande', $validated['id_commande'])->first();

        if ($exists) {
            return response()->json([
                'message' => 'Bon de livraison déjà existe pour cette commande'
            ], 400);
        }

        $item = BonLivraison::create($validated);

        return response()->json([
            'message' => 'BonLivraison created successfully',
            'data' => $item
        ], 201);
    }

    // 📌 UPDATE
    public function update(Request $request, $id)
    {
        $item = BonLivraison::find($id);

        if (!$item) {
            return response()->json([
                'message' => 'BonLivraison not found'
            ], 404);
        }

        $validated = $request->validate([
            'id_commande' => 'sometimes|exists:commandes,id_commande',
            'date_livraison' => 'sometimes|date'
        ]);

        $item->update($validated);

        return response()->json([
            'message' => 'BonLivraison updated successfully',
            'data' => $item
        ], 200);
    }

    // 📌 DELETE
    public function destroy($id)
    {
        $item = BonLivraison::find($id);

        if (!$item) {
            return response()->json([
                'message' => 'BonLivraison not found'
            ], 404);
        }

        $item->delete();

        return response()->json([
            'message' => 'BonLivraison deleted successfully'
        ], 200);
    }
}