@extends('layouts.main-report')
@section('content')
<div class="d-flex align-items-center p-3 my-3">
    <h1>Proposta {{$proposal->cod_lyon}} {{$proposal->client->name}}</h1>
    <h3>Tipo de serviço {{$proposal->typeService->name}}</h3>
</div>
<div class="col-12">
    <span><b>Data requisição</b> {{$proposal->date_request->format('d/m/Y')}}</span>
    <span><b>Data limite confirmação</b> {{$proposal->deadline_date_confirme->format('d/m/Y')}} {{$proposal->deadline_time_confirme}}</span>
</div>
<div class="col-12">
    <h3>Outra linha</h3>
</div>
@endsection