<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especie extends Model
{
    use HasFactory;

    protected $table = 'especies';

    protected $fillable = [
        'nome',
        'nome_cientifico',
    ];

    public function plantas()
    {
        return $this->hasMany(Planta::class);
    }
}
