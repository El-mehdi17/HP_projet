<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    // 📌 GET ALL FOURNISSEURS
    public function index()
    {
        $fournisseurs = Fournisseur::all();

        return response()->json($fournisseurs, 200);
    }

    // 📌 GET ONE FOURNISSEUR
    public function show($id)
    {
        $fournisseur = Fournisseur::find($id);

        if (!$fournisseur) {
            return response()->json([
                'message' => 'Fournisseur not found'
            ], 404);
        }

        return response()->json($fournisseur, 200);
    }

    // 📌 CREATE FOURNISSEUR
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:fournisseurs,email',
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string'
        ]);

        $fournisseur = Fournisseur::create($validated);

        return response()->json([
            'message' => 'Fournisseur created successfully',
            'data' => $fournisseur
        ], 201);
    }

    // 📌 UPDATE FOURNISSEUR
    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::find($id);

        if (!$fournisseur) {
            return response()->json([
                'message' => 'Fournisseur not found'
            ], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:fournisseurs,email,' . $id,
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string'
        ]);

        $fournisseur->update($validated);

        return response()->json([
            'message' => 'Fournisseur updated successfully',
            'data' => $fournisseur
        ], 200);
    }

    // 📌 DELETE FOURNISSEUR
    public function destroy($id)
    {
        $fournisseur = Fournisseur::find($id);

        if (!$fournisseur) {
            return response()->json([
                'message' => 'Fournisseur not found'
            ], 404);
        }

        $fournisseur->delete();

        return response()->json([
            'message' => 'Fournisseur deleted successfully'
        ], 200);
    }
}
