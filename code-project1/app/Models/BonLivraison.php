<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Commande;
use App\Models\Livraison;

class BonLivraison extends Model
{
    use HasFactory;
    protected $fillable=[
        'id_commande',
        'date_livraison',
        
    ];
    protected $primaryKey = 'id_bon_livraison';
    protected $table="bon_livraisons";
    public function commande(): HasOne
    {
        return $this->belongsTo(Commande::class, 'id_commande', 'id_commande');
    }
    public function livraison(): HasMany
    {
        return $this->hasMany(Livraison::class, 'id_bon_livraison', 'id_bon_livraison');
    }
}
