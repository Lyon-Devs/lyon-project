<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    {{-- <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"> --}}
    <!-- Scripts -->
    {{-- <script src="{{ base_path().'/app/public/js/app.js' }}" defer></script> --}}

    <!-- Styles -->

    {{-- <link href="{{ base_path().'/public/css/app.css' }}" rel="stylesheet"> --}}
    {{-- <link href="{{asset('/css/app.css')}}" rel="stylesheet"> --}}
    <!-- Styles -->

</head>

<body class="">
    @yield('content')
    @yield('scripts')
</body>

</html>