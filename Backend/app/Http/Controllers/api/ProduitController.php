<?php

namespace App\Http\Controllers;

use App\Models\Produit;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProduitController extends Controller
{
public function index(){
   $all=Produit::all();
   if($all->isEmpty()){
    return response()->json([
        "success"=>false,
        "message"=>"Aucun produit trouvé"
    ],404);
   }
return response()->json([
    "success"=>true,
    "data"=> $all
],200);
}

public function show(Request $req){
     $name=validator::make($req->all(),[
        "nom"=>"required|string|max:255"
     ]);

    if($name->fails()){
        return response()->json([
            'success' => false,
            'errors' => $name->errors()
        ], 400);
    }

    $produit=Produit::find($req->nom);
    if (!$produit) {
        return response()->json([
            'success' => false,
            'message' => 'Produit non trouvé'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $produit
    ], 200);
}

public function store(Request $r){

}

}