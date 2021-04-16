<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contract extends Model
{
    use HasFactory, SoftDeletes;
    // Centro de Custo	$center_cost									
    // Tipo [Contrato, Pedido de Compra]	$type				
    // 	Contrato				
    // 		Nº do contrato			
    // 	Pedido de Compra				
    // 		Nº do Pedido de Compra			
    // Gerente Lyon				Amarzenar o anterior	
    // Gerente Cliente					
    // Tipo de Serviço					
    // Escopo					
    // Prazo de exec. (Meses)					
    // Inicio do Contrato					
    // Fim do contrato					
    // Data Base de reajuste

    protected $fillable = [
        'center_cost',
        'type',
        'number_contract'
    ];
}
