<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // 📌 GET ALL CLIENTS
    public function index()
    {
        return response()->json(Client::all(), 200);
    }

    // 📌 GET ONE CLIENT
    public function show($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'message' => 'Client not found'
            ], 404);
        }

        return response()->json($client, 200);
    }

    // 📌 CREATE CLIENT
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string'
        ]);

        $client = Client::create($validated);

        return response()->json([
            'message' => 'Client created successfully',
            'data' => $client
        ], 201);
    }

    // 📌 UPDATE CLIENT
    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'message' => 'Client not found'
            ], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clients,email,' . $id,
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string'
        ]);

        $client->update($validated);

        return response()->json([
            'message' => 'Client updated successfully',
            'data' => $client
        ], 200);
    }

    // 📌 DELETE CLIENT
    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'message' => 'Client not found'
            ], 404);
        }

        $client->delete();

        return response()->json([
            'message' => 'Client deleted successfully'
        ], 200);
    }
}