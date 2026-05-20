<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\BonLivraison;

class Livraison extends Model
{
    use HasFactory;
    protected $fillable=[
        'id_bl',
        'name',
        'date_livraison',
        'tele',
        'type',
        'status'
    ];
    protected $primaryKey = 'id_livraison';
    protected $table="livraisons";
    public function bonLivraison(): HasMany
    {
        return $this->belongsTo(BonLivraison::class, 'id_bl', 'id_bl');
    }
}
