<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

use App\Models\Client;
use App\Models\Facture;
use App\Models\Intervention;
use App\Models\BonLivraison;
use App\Models\CommandeProduit;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_client',
        'description',
        'date_commande',
    ];

    protected $primaryKey = 'id_commande';
    protected $table = "commandes";

    // ✅ Commande appartient à Client
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'id_client', 'id_client');
    }

    // ✅ Commande a une Facture
    public function facture(): HasOne
    {
        return $this->hasOne(Facture::class, 'id_commande', 'id_commande');
    }

    // ✅ Commande a un Bon de livraison
    public function bonLivraison(): HasOne
    {
        return $this->hasOne(BonLivraison::class, 'id_commande', 'id_commande');
    }

    // ✅ Commande a plusieurs produits
    public function commandeProduits(): HasMany
    {
        return $this->hasMany(CommandeProduit::class, 'id_commande', 'id_commande');
    }

    // ✅ Commande a plusieurs interventions
    public function interventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'id_commande', 'id_commande');
    }
}