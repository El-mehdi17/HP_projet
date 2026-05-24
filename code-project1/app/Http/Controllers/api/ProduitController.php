<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
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

public function store(Request $r)
{
    $r->validate([
        "nom" => "required|string|max:255",
        "description" => "required|string",
        "prix" => "required|numeric|min:0",
        "images" => "nullable|array",
        "images.*" => "file|image|mimes:jpg,jpeg,png,webp|max:5120",
        "id_fournisseur" => "required|exists:fournisseurs,id",
        "quantite_stock" => "required|integer|min:0"
    ]);

    $images = [];
    if ($r->hasFile("images")) {
        foreach ($r->file("images") as $img) {
            $images[] = $img->store("products", "public");
        }
    }

    $produit = Produit::create([
        "nom" => $r->nom,
        "description" => $r->description,
        "prix" => $r->prix,
        "images" => empty($images) ? null : json_encode($images),
        "id_fournisseur" => $r->id_fournisseur,
        "quantite_stock" => $r->quantite_stock
    ]);

    return response()->json(["success" => true, "data" => $produit], 201);
}

public function update(Request $r,$id){
    $produit=Produit::find($id);
    if(!$produit){
        return response()->json([
            "success"=>false,
            "message"=>"Produit non trouvé"
        ],404);
    }
    $val=$r->validate([
        "nom"=>'string|max=255',
        'description'=>'text',
        "prix"=>'integer|min=0',
        "image_url"=>'image|mimes:jpg,jpeg,png,webp|max:2048',
        "id_fournisseur"=>'integer|exists:fournisseurs,id_fournisseur',
        "quantite_stock"=>'integer|min=0'
    ]);
    $produit->update($val);
    return response()->json([
        "success"=>true,
        "data"=>$produit
    ],200);
}
public function destroy($id){
    $produit=Produit::find($id);
    if(!$produit){
        return response()->json([
            "success"=>false,
            "message"=>"Produit non trouvé"
        ],404);
    }
    $produit->delete();
    return response()->json([
        "success"=>true,
        "message"=>"Produit supprimé avec succès"
    ],200);
}

}
