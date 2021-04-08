<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProposalRevision extends Model
{
    use HasFactory;

    //     Nº Revisão da Proposta Consolidada $number_revision			
    // Data do comitê $created_at			
    // Tipo de Precificação (Global, Unitario, Cardapio) $type_price			
    // Histograma Médio	 $gross margin		
    // Preço Global	$global_price		
    // Margem Bruta	$gross_margin		
    // BDI	$bdi		
    // Imposto	$taxes		
    // Encargo $charge			
    // Tipo de Aviso $type_warning			
    // Riscos $risks			
    // Taxa Financeira (Abaixo do BDI) $financial_taxis

    protected $fillable = [
        'number_revision',
        'type_price',
        'medium_histogram',
        'global_price',
        'gross_margin',
        'bdi',
        'taxes',
        'charge',
        'type_warning',
        'risks',
        'financial_taxis'

    ];
}
