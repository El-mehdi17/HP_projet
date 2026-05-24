<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Modeld\CommandeProduit;
use App\Models\Fournisseur;

class Produit extends Model
{
    use HasFactory;
    protected $fillable=[
        'nom',
        'description',
        'prix',
        'quantite_stock',
        'images',
        'id_fournisseur',
    ];
    protected $table="produits";
    public function commandeProduits(): HasMany
    {
        return $this->hasMany(CommandeProduit::class, 'id_produit', 'id_produit');
    }
    public function fournisseur(): HasMany
    {
        return $this->belongsTo(Fournisseur::class, 'id_fournisseur', 'id_fournisseur');
    }
}
