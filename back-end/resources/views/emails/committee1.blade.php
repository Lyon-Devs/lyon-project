@extends('emails.default')
@section('content')
{{-- <style>
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
</style> --}}
Olá,

Segue documentação para aprovação de proposta
<br><br>


<html>

<head></head>




<table cellspacing="0" cellpadding="4" style="border-collapse:collapse;color:#1f2240;border:1px solid #000">
    <thead>
        <tr bgcolor="#8D6851">
            <td colspan="2">
                COMITÊ 01 - DEFINIÇÃO DE PARTICIPAÇÃO EM CONCORRÊNCIA
            </td>
        </tr>
    </thead>
    <thead >
        <tr style="border:1px solid #000">
            <td bgcolor="#8D6851" style="border:1px solid #000">
                Data limite para confirmação de participação:
            </td>
            <td bgcolor="#8D6851" style="border:1px solid #000">
                {{$proposal->deadline_date_confirme->format('d/m/Y')}}
            </td>
        </tr>
    </thead>
    <tr >
        <td style="border:1px solid #000">
            Nº SDC / CVT:
        </td>
        <td style="border:1px solid #000">
            {{$proposal->number_client_request}}
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Data da SCD / CVT:
        </td>
        <td style="border:1px solid #000">
            @if(empty($proposal->date_request))
            Não informado
            @else {{$proposal->date_request->format('d/m/Y')}} @endif
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Nº Proposta LYON:
        </td>
        <td style="border:1px solid #000">
            {{$proposal->cod_lyon}}
        </td>
    </tr>
    <tr>
        <td>
            Tipo de serviço
        </td>
        <td style="border:1px solid #000">
            {{$proposal->typeService->unity_business}}
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Cliente
        </td>
        <td style="border:1px solid #000">
            {{$proposal->client->name}}
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Ramo de atuação
        </td>
        <td style="border:1px solid #000">
            {{$proposal->client->actingBranches->name}}
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Proposta técnica:
        </td>
        <td style="border:1px solid #000">
            @if(empty($proposal->date_delivery_technique_proposal))
            não
            @else
            {{$proposal->date_delivery_technique_proposal->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Proposta comercial:
        </td>
        <td style="border:1px solid #000">
            @if(empty($proposal->date_delivery_comercial_proposal))
            não
            @else
            {{$proposal->date_delivery_comercial_proposal->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Visita Técnica:
        </td>
        <td style="border:1px solid #000">
            @if(empty($proposal->date_technique_visit))
            não
            @else
            {{$proposal->date_technique_visit->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    @if(!empty($proposal->date_technique_visit))
    <tr>
        <td style="border:1px solid #000" class="sub">
            Local visita técnica:
        </td>
        <td style="border:1px solid #000">
            {{$proposal->local_technique_visit}}
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000" class="sub">
            Detalhes visita técnica:
        </td>
        <td style="border:1px solid #000">
            {{$proposal->details_technique_visit}}
        </td>
    </tr>
    @endif
    <tr>
        <td style="border:1px solid #000">
            Local da prestação de serviço
        </td>
        <td style="border:1px solid #000">
            {{$proposal->place_to_deploys_services}}
        </td>
    </tr>
    <thead>
        <tr>
            <td style="border:1px solid #000" colspan="2" bgcolor="#8D6851">
                Escopo resumido
            </td>
        </tr>
    </thead>
    <tr>
        <td style="border:1px solid #000;word-break:break-word" colspan="2">
            {{$proposal->summary_scope}}
        </td>
    </tr>
    <thead>
        <tr>
            <td style="border:1px solid #000;" colspan="2" bgcolor="#8D6851">
                Escopo detalhado
            </td>
        </tr>
    </thead>
    <tr>
        <td style="border:1px solid #000;word-break:break-word" colspan="2">
            {{$proposal->scope}}
        </td>
    </tr>
    <thead>
        <tr>
            <td style="border:1px solid #000" colspan="2" bgcolor="#8D6851">
                Obserservações do setor de propostas
            </td>
        </tr>
    </thead>
    <tr>
        <td style="border:1px solid #000" colspan="2">
            {{$proposal->observations}}
        </td>
    </tr>
</table>
<br>Att,<br>
SGP LYON
@endsection