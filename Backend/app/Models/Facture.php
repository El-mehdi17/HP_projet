<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Commande;

class Facture extends Model
{
    use HasFactory;
    protected $fillable=[
        'id_commande',
        'total',
        'date_facture',
    ];
    protected $primaryKey = 'id_facture';
    protected $table="factures";
    public function commande(): HasOne
    {
        return $this->belongsTo(Commande::class, 'id_commande', 'id_commande');
    }
    
    
}
