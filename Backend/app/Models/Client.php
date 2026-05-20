<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Intervention;
use App\Models\Commande;

class Client extends Model
{
    use HasFactory;
    protected $fillable=[
        
        'nom',
        'email',
        'telephone',
        'adresse',
    ];
    public $incrementing = true;
    protected $primaryKey = 'id_client';
    protected $table="clients";

 //relationes 🔽🔽   
  
        
public function commandes(): HasMany
    {
        return $this->hasMany(Commande::class, 'id_client', 'id_client');
    }
}
