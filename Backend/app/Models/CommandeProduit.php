<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Commande;
use App\Models\Produit;

class CommandeProduit extends Model
{
    use HasFactory;
    protected $fillable=[
        'id_commande',
        'id_produit',
        'quantite',
    ];
    protected $primaryKey = 'id';
    protected $table="commande_produit";
    public function commande(): HasMany
    {
        return $this->belongsTo(Commande::class, 'id_commande', 'id_commande');
    }
    public function produit(): HasMany
    {
        return $this->belongsTo(Produit::class, 'id_produit', 'id_produit');
    }
}
