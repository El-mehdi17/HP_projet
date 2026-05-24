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
    protected $fillable = ['nom', 'email', 'telephone', 'adresse', 'password'];
    protected $hidden = ['password'];
    protected $table = "clients";

    public function commandes(): HasMany
    {
        return $this->hasMany(Commande::class, 'id_client', 'id');
    }
}
