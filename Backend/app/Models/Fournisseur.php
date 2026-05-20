<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Modeld\Produit;

class Fournisseur extends Model
{
    use HasFactory;
    protected $fillable=[
        'nom',
        'email',
        'telephone',
        'adresse',
    ];
    protected $primaryKey = 'id_fournisseur';
    protected $table="fournisseurs";
    public function produits(): HasOne
    {
        return $this->hasOne(Produit::class, 'id_fournisseur', 'id_fournisseur');
    }


}
