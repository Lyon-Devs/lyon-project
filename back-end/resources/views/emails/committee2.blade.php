@component('mail::message')
<style>
    .table {
        width: 100%;
    }

    .table thead {
        background-color: #000;
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


<table class="table" cellspacing="0" cellpadding="0">
    <thead>
        <tr>
            <td colspan="7" style="color: #fff !important;padding:10px 5px">
                COMITÊ 01 - DEFINIÇÃO DE PARTICIPAÇÃO EM CONCORRÊNCIA
            </td>
        </tr>
    </thead>
    <thead>
        <tr>
            <td colspan="7" style="color: #fff !important;padding:10px 5px">
                Data limite para confirmação de participação:
            </td>
        </tr>
    </thead>
    <tr>
        <td colspan="1">
            Nº SDC / CVT:
        </td>
        <td colspan="6">
            {{$proposal->number_client_request}}
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Data da SCD / CVT:
        </td>
        <td colspan="6">
            @if(empty($proposal->date_request))
            Não informado
            @else {{$proposal->date_request->format('d/m/Y')}} @endif
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Nº Proposta LYON:
        </td>
        <td colspan="6">
            {{$proposal->cod_lyon}}
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Tipo de serviço
        </td>
        <td colspan="6">
            {{$proposal->typeService->name}}
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Cliente
        </td>
        <td colspan="6">
            {{$proposal->client->name}}
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Ramo de atuação
        </td>
        <td colspan="6">
            {{$proposal->client->actingBranches->name}}
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Escopo resumido
        </td>
        <td colspan="6">
            {{$proposal->summary_scope}}
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Prazo execução
        </td>
        <td colspan="6">
            {{$proposal->months_exec}} (meses)
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Proposta técnica:
        </td>
        <td colspan="6">
            @if(empty($proposal->date_delivery_technique_proposal))
            não
            @else
            {{$proposal->date_delivery_technique_proposal->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Proposta comercial:
        </td>
        <td colspan="6">
            @if(empty($proposal->date_delivery_comercial_proposal))
            não
            @else
            {{$proposal->date_delivery_comercial_proposal->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    <tr>
        <td colspan="1">
            Visita Técnica:
        </td>
        <td colspan="6">
            @if(empty($proposal->date_technique_visit))
            não
            @else
            {{$proposal->date_technique_visit->format('d/m/Y')}}
            @endif
        </td>
    </tr>
    @if(!empty($proposal->date_technique_visit))
    <tr>
        <td class="sub" colspan="1">
            Local visita técnica:
        </td>
        <td colspan="6">
            {{$proposal->place_to_deploys_services}}
        </td>
    </tr>
    <tr>
        <td class="sub" colspan="1">
            Detalhes visita técnica:
        </td>
        <td colspan="6">
            {{$proposal->place_to_deploys_services}}
        </td>
    </tr>
    @endif
    <tr>
        <td colspan="1">
            Local da prestação de serviço
        </td>
        <td colspan="6">
            {{$proposal->place_to_deploys_services}}
        </td>
    </tr>
    <thead>
        <tr>
            <td colspan="7" style="color: #fff !important;padding:10px 5px">
                Obserservações do setor de propostas
            </td>
        </tr>
    </thead>
    <tr>
        <td colspan="7">
            {{$proposal->observations}}
        </td>
    </tr>

</table>

<table class="table" cellspacing="0" cellpadding="0">
    <thead>
        <tr>
            <td colspan="7" style="color: #fff !important;padding:10px 5px">
                Revisões
            </td>
        </tr>
    </thead>
    <tr>
        <td width="14">
            Revisão
        </td>
        <td width="14">
            Preço global
        </td>
        <td width="14">
            Margem bruta
        </td>
        <td width="14">
            BDI
        </td>
        <td width="14">
            Imposto
        </td>
        <td width="14">
            Data comitê
        </td>
        <td width="14">
            Taxa Financeira
        </td>
    </tr>
    @forelse ($proposal->revisions as $revision)
    <tr>
        <td width="14">
            {{$revision->number_revision}}
        </td>
        <td width="14">
            {{$revision->global_price}}
        </td>
        <td width="14">
            {{$revision->gross_margin}}
        </td>
        <td width="14">
            {{$revision->bdi}}
        </td>
        <td width="14">
            {{$revision->taxes}}
        </td>
        <td width="14">
            {{$revision->data_committee->format('d/m/y')}}
        </td>
        <td width="14">
            {{$revision->financial_taxis}}
        </td>
    </tr>
    @empty
        <tr>
            <td colspan="7">Sem Revisões</td>
        </tr>
    @endforelse
</table>
Att,<br>
SGP LYON
@endcomponent