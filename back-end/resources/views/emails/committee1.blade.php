@extends('emails.default')
@section('content')
<style>
    .table {
        width: 100%;
    }

    .table thead {
        background-color: #8D6851;
    }

    .table thead tr {
        padding: 5px;
        font-weight: 600;
    }

    .table tbody tr td {
        border: 1px solid black;
        padding-left: 5px !important;
    }

    .table tbody tr td:first-child {
        background-color: #e3e4e5;
    }

    .table tbody tr .sub {
        background-color: #9c9d9e !important;
        color: #fff !important;
        font-weight: 600;
    }
</style>
Olá,

Segue documentação para aprovação de proposta
<br><br>


<table class="table" cellspacing="0" cellpadding="0">
    <thead>
        <tr>
            <td colspan="2" style="color: #fff !important;padding:10px 5px">
                COMITÊ 01 - DEFINIÇÃO DE PARTICIPAÇÃO EM CONCORRÊNCIA
            </td>
        </tr>
    </thead>
    <thead>
        <tr>
            <td  style="color: #fff !important;padding:10px 5px">
                Data limite para confirmação de participação:
            </td>
            <td style="color: #fff !important;padding:10px 5px">
                {{$proposal->deadline_date_confirme->format('d/m/Y')}}
            </td>
        </tr>
    </thead>
    <tr>
        <td>
            Nº SDC / CVT:
        </td>
        <td>
            {{$proposal->number_client_request}}
        </td>
    </tr>
    <tr>
        <td>
            Data da SCD / CVT:
        </td>
        <td>
            @if(empty($proposal->date_request))
            Não informado
            @else {{$proposal->date_request->format('d/m/Y')}} @endif
        </td>
    </tr>
    <tr>
        <td>
            Nº Proposta LYON:
        </td>
        <td>
            {{$proposal->cod_lyon}}
        </td>
    </tr>
    <tr>
        <td>
            Tipo de serviço
        </td>
        <td>
            {{$proposal->typeService->unity_business}}
        </td>
    </tr>
    <tr>
        <td>
            Cliente
        </td>
        <td>
            {{$proposal->client->name}}
        </td>
    </tr>
    <tr>
        <td>
            Ramo de atuação
        </td>
        <td>
            {{$proposal->client->actingBranches->name}}
        </td>
    </tr>
    <tr>
        <td>
            Escopo resumido
        </td>
        <td>
            {{$proposal->summary_scope}}
        </td>
    </tr>
    <tr>
        <td>
            Prazo execução
        </td>
        <td>
            {{$proposal->months_exec}} (meses)
        </td>
    </tr>
    <tr>
        <td>
            Proposta técnica:
        </td>
        <td>
            @if(empty($proposal->date_delivery_technique_proposal))
            não
            @else
            {{$proposal->date_delivery_technique_proposal->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    <tr>
        <td>
            Proposta comercial:
        </td>
        <td>
            @if(empty($proposal->date_delivery_comercial_proposal))
            não
            @else
            {{$proposal->date_delivery_comercial_proposal->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    <tr>
        <td>
            Visita Técnica:
        </td>
        <td>
            @if(empty($proposal->date_technique_visit))
            não
            @else
            {{$proposal->date_technique_visit->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    @if(!empty($proposal->date_technique_visit))
    <tr>
        <td class="sub">
            Local visita técnica:
        </td>
        <td>
            {{$proposal->local_technique_visit}}
        </td>
    </tr>
    <tr>
        <td class="sub">
            Detalhes visita técnica:
        </td>
        <td>
            {{$proposal->details_technique_visit}}
        </td>
    </tr>
    @endif
    <tr>
        <td>
            Local da prestação de serviço
        </td>
        <td>
            {{$proposal->place_to_deploys_services}}
        </td>
    </tr>
    <thead>
        <tr>
            <td colspan="2" style="color: #fff !important;padding:10px 5px">
                Escopo detalhado
            </td>
        </tr>
    </thead>
    <tr>
        <td colspan="2">
            {{$proposal->scope}}
        </td>
    </tr>
    <thead>
        <tr>
            <td colspan="2" style="color: #fff !important;padding:10px 5px">
                Obserservações do setor de propostas
            </td>
        </tr>
    </thead>
    <tr>
        <td colspan="2">
            {{$proposal->observations}}
        </td>
    </tr>
</table>
<br>Att,<br>
SGP LYON
@endsection