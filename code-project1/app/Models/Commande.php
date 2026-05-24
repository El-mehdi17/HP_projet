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
        'statut',
    ];

    protected $table = "commandes";

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'id_client', 'id');
    }

    public function facture(): HasOne
    {
        return $this->hasOne(Facture::class, 'id_commande', 'id');
    }

    public function bonLivraison(): HasOne
    {
        return $this->hasOne(BonLivraison::class, 'id_commande', 'id');
    }

    public function commandeProduits(): HasMany
    {
        return $this->hasMany(CommandeProduit::class, 'id_commande', 'id');
    }

    public function interventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'id_commande', 'id');
    }
}