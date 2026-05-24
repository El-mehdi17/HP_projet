<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Commande;
use App\Models\Technicien;

class Intervention extends Model
{
    use HasFactory;
    protected $fillable = ['id_commande', 'id_technicien', 'description', 'statut'];
    protected $primaryKey = 'id_intervention';
    protected $table = "interventions";
    public function client(): HasMany
    {
        return $this->belongsTo(Client::class, 'id_commande', 'id_commande');
    }
    public function technicien(): HasMany
    {
        return $this->belongsTo(Technicien::class, 'id_technicien', 'id_technicien');
    }
}
