<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planta extends Model
{
    use HasFactory;

    protected $table = 'plantas';
    protected $fillable = [
        'nome_planta',
        'data_plantio',
        'umidade',
        'luz',
        'temperatura',
        'especie_id',
    ];

    public function especie()
    {
        return $this->belongsTo(Especie::class);
    }
}
