<?php

namespace App\Http\Controllers;

use App\Models\CommandeProduit;
use Illuminate\Http\Request;

class CommandeProduitController extends Controller
{
    // 📌 GET ALL
    public function index()
    {
        $data = CommandeProduit::with(['commande', 'produit'])->get();

        return response()->json($data, 200);
    }

    // 📌 GET ONE
    public function show($id)
    {
        $item = CommandeProduit::with(['commande', 'produit'])->find($id);

        if (!$item) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        return response()->json($item, 200);
    }

    // 📌 CREATE (Ajouter produit à commande)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_commande' => 'required|exists:commandes,id',
            'id_produit'  => 'required|exists:produits,id',
            'quantite'    => 'required|integer|min:1',
            'prix'        => 'required|numeric|min:0',
        ]);

        // 🔥 vérifier si produit déjà موجود في نفس commande
        $exists = CommandeProduit::where('id_commande', $validated['id_commande'])
            ->where('id_produit', $validated['id_produit'])
            ->first();

        if ($exists) {
            return response()->json([
                'message' => 'Produit déjà ajouté à cette commande'
            ], 400);
        }

        $item = CommandeProduit::create($validated);

        return response()->json([
            'message' => 'Produit ajouté à la commande',
            'data' => $item
        ], 201);
    }

    // 📌 UPDATE (changer quantité)
    public function update(Request $request, $id)
    {
        $item = CommandeProduit::find($id);

        if (!$item) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        $validated = $request->validate([
            'quantite' => 'required|integer|min:1'
        ]);

        $item->update($validated);

        return response()->json([
            'message' => 'Quantité mise à jour',
            'data' => $item
        ], 200);
    }

    // 📌 DELETE (supprimer produit de commande)
    public function destroy($id)
    {
        $item = CommandeProduit::find($id);

        if (!$item) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        $item->delete();

        return response()->json([
            'message' => 'Produit supprimé de la commande'
        ], 200);
    }
}