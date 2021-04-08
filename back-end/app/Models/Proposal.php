<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasFactory;


    //     Cliente (Chave) – [Listbox]				
    // 	Comprador (Chave) – [Listbox] $buyer				
    // Nº Solicitação do Cliente – [Texto] $number_client_request
    // Nº da Proposta Lyon – [Texto] $cod_lyon					
    // Tipo de Serviço (Chave) – [Listbox]					
    // Data de Solicitação do cliente $date_request					
    // Proposta Técnica [Listbox]					
    // 	Opção SIM				
    // 	Data da entrega da proposta técnica (Caso a opção proposta técnica seja Sim) $date_delivery_technique_proposal				
    // Responsável pela proposta técnica [Listbox] (Usuários) $owner_technique_proposal					
    // Proposta Comercial [Listbox]					
    // 	Opção Sim				
    // 		Data da entrega da proposta técnica	$date_delivery_comercial_proposal		
    // Responsável pela proposta Comercial [Listbox] (Usuários)	$owner_comercial_proposal				
    // Resumo do escopo	$summary_scope				
    // Escopo $scope					
    // Prazo de exec. (Meses) $months_exec					
    // Visita Técnica [Listbox]					
    // 	Opção SIM				
    // 		Data Visita Técnica	 $date_technique_visit
    // 		Hora Visita Téc.	$date_technique_visit
    // 		Local Visita Téc	$local_technique_visit		
    // 		Detalhes da Visita Técnica	 $details_technique_visit		
    // Local Prestação dos Serviços $place_to_deploys_services					
    // Prazo Confirm. Participação	$deadline_confirme				
    // Horário Confirm. Participação $deadline_confirme					
    // Histograma Médio (Caso "Sim" informar o quantitativo) $medium histogram					
    // Anexos					
    // Considerações Comitê 1	'observations'	

    //status [comitê1, commitê2, finalizado]
    protected $fillable = [
        'buyer',
        'number_client_request',
        'cod_lyon',
        'date_request',
        'date_delivery_comercial_proposal',
        'owner_technique_proposal',
        'owner_comercial_proposal',
        'summary_scope',
        'scope',
        'months_exec',
        'date_delivery_technique_proposal',
        'date_technique_visit',
        'local_technique_visit',
        'details_technique_visit',
        'comercial_delivery',
        'place_to_deploys_services',
        'contract_time',
        'deadline_confirme',
        'medium_histogram',
        'observations',
        'status'
    ];
}
