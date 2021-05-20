@extends('emails.default')
@section('content')

Olá,<br><br>

Segue os valores e condições acordas perante o comitê 2.
<br><br>


<table cellspacing="0" cellpadding="4" style="border-collapse:collapse;color:#1f2240;border:1px solid #000">
    <thead>
        <tr bgcolor="#8D6851">
            <td colspan="2">
                COMITÊ 01 - DEFINIÇÃO DE PARTICIPAÇÃO EM CONCORRÊNCIA
            </td>
        </tr>
    </thead>
    <thead>
        <tr style="border:1px solid #000">
            <td bgcolor="#8D6851" style="border:1px solid #000">
                Data limite para confirmação de participação:
            </td>
            <td bgcolor="#8D6851" style="border:1px solid #000">
                {{$proposal->deadline_date_confirme->format('d/m/Y')}}
            </td>
        </tr>
    </thead>
    <tr>
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
<table width="100%" cellspacing="0" cellpadding="4"
    style="border-collapse:collapse;color:#1f2240;border:1px solid #000;margin-top:15px">
    <tr>
        <td colspan="7" scope="colgroup" bgcolor="#8D6851">
            Revisões
        </td>
    </tr>
    <tr>
        <td style="border:1px solid #000">
            Revisão
        </td>
        <td style="border:1px solid #000">
            Preço global
        </td>
        <td style="border:1px solid #000">
            Margem bruta
        </td>
        <td style="border:1px solid #000">
            BDI
        </td>
        <td style="border:1px solid #000">
            Imposto
        </td>
        <td style="border:1px solid #000">
            Data comitê
        </td>
        <td style="border:1px solid #000">
            Taxa Financeira
        </td>
    </tr>
  @forelse ($proposal->revisions as $revision)
    <tr>
        <td style="border:1px solid #000">
            {{$revision->number_revision}}
        </td>
        <td style="border:1px solid #000">
            {{$revision->global_price}}
        </td>
        <td style="border:1px solid #000">
            {{$revision->gross_margin}}
        </td>
        <td style="border:1px solid #000">
            {{$revision->bdi}}
        </td>
        <td style="border:1px solid #000">
            {{$revision->taxes}}
        </td>
        <td style="border:1px solid #000">
            {{$revision->data_committee->format('d/m/y')}}
        </td>
        <td style="border:1px solid #000">
            {{$revision->financial_taxis}}
        </td>
    </tr>
    @empty
    <tr>
        <td style="border:1px solid #000" colspan="7">Sem Revisões</td>
    </tr>
    @endforelse

</table>
<br><br>Att,<br>
SGP LYON
@endsection