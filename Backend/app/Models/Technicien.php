<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Intervention;

class Technicien extends Model
{
    use HasFactory;
    protected $fillable=[
        'nom',
        'email',
        'telephone',
        'specialite',
    ];
    protected $primaryKey = 'id_technicien';
    protected $table="techniciens";
    public function interventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'id_technicien', 'id_technicien');
    }
}
