<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::all(), 200);
    }

    public function show($id)
    {
        $client = Client::find($id);
        if (!$client) return response()->json(['message' => 'Client not found'], 404);
        return response()->json($client, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string',
            'password' => 'required|string|min:6',
        ]);
        $validated['password'] = Hash::make($validated['password']);
        $client = Client::create($validated);
        return response()->json(['message' => 'Client created', 'data' => $client], 201);
    }

    public function update(Request $request, $id)
    {
        $client = Client::find($id);
        if (!$client) return response()->json(['message' => 'Client not found'], 404);
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clients,email,' . $id,
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string',
        ]);
        $client->update($validated);
        return response()->json(['message' => 'Client updated', 'data' => $client], 200);
    }

    public function destroy($id)
    {
        $client = Client::find($id);
        if (!$client) return response()->json(['message' => 'Client not found'], 404);
        $client->delete();
        return response()->json(['message' => 'Client deleted'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $client = Client::where('email', $request->email)->first();
        if (!$client) {
            return response()->json(['message' => 'Aucun compte avec cet email.'], 404);
        }
        $client->update(['password' => Hash::make($request->password)]);
        return response()->json(['message' => 'Mot de passe mis à jour.'], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        $client = Client::where('email', $request->email)->first();
        if (!$client || !Hash::check($request->password, $client->password)) {
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }
        return response()->json(['client' => $client], 200);
    }
}