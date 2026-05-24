<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Api\FournisseurController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\LivraisonController;
use App\Http\Controllers\BonLivraisonController;
use App\Http\Controllers\TechnicienController;
use App\Http\Controllers\CommandeProduitController;
use App\Http\Controllers\InterventionController;
/*|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::apiResource('produits', ProduitController::class);
Route::post('clients/login', [ClientController::class, 'login']);
Route::post('clients/reset-password', [ClientController::class, 'resetPassword']);
Route::apiResource('clients', ClientController::class);
Route::apiResource('fournisseurs', FournisseurController::class);
Route::apiResource('commandes', CommandeController::class);
Route::apiResource('commande-produits', CommandeProduitController::class);

Route::apiResource('factures', FactureController::class);
Route::apiResource('livraisons', LivraisonController::class);
Route::apiResource('bon-livraisons', BonLivraisonController::class);
Route::apiResource('techniciens', TechnicienController::class);
Route::apiResource('interventions', InterventionController::class);





Route::get("/players", function () {

    return response()->json([
        [
            "id"=>1,
            "name"=>"Mahdi",
            "game"=>"Football"
        ],
        [
            "id"=>2,
            "name"=>"Ali",
            "game"=>"Basketball"
        ]
    ]);

});
