<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    // 📌 GET ALL PRODUITS
    public function index()
    {
        $produits = Produit::all();

        return response()->json($produits, 200);
    }

    // 📌 GET ONE PRODUIT
    public function show($id)
    {
        $produit = Produit::find($id);

        if (!$produit) {
            return response()->json([
                'message' => 'Produit not found'
            ], 404);
        }

        return response()->json($produit, 200);
    }

    // 📌 CREATE PRODUIT
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'quantite' => 'required|integer',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id_fournisseur'
        ]);

        $produit = Produit::create($validated);

        return response()->json([
            'message' => 'Produit created successfully',
            'data' => $produit
        ], 201);
    }

    // 📌 UPDATE PRODUIT
    public function update(Request $request, $id)
    {
        $produit = Produit::find($id);

        if (!$produit) {
            return response()->json([
                'message' => 'Produit not found'
            ], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'sometimes|numeric',
            'quantite' => 'sometimes|integer',
            'id_fournisseur' => 'nullable|exists:fournisseurs,id_fournisseur'
        ]);

        $produit->update($validated);

        return response()->json([
            'message' => 'Produit updated successfully',
            'data' => $produit
        ], 200);
    }

    // 📌 DELETE PRODUIT
    public function destroy($id)
    {
        $produit = Produit::find($id);

        if (!$produit) {
            return response()->json([
                'message' => 'Produit not found'
            ], 404);
        }

        $produit->delete();

        return response()->json([
            'message' => 'Produit deleted successfully'
        ], 200);
    }
}