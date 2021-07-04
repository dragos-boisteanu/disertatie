<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-screen">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ?? 'Store' }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@splidejs/splide@2.4.21/dist/css/themes/splide-default.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@2.4.21/dist/js/splide.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://unpkg.com/vue-toastr/dist/vue-toastr.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <script src="{{ asset(mix('js/app.js')) }}" defer></script>
    

</head>

<body class="h-full">
    {!! Toastr::message() !!}
    <div id="backdrop" class="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-75" style="display: none"></div>
    <div id="store-app" class="h-full flex flex-col">
        @include('includes.header')
        <main class="flex-1 bg-gray-800 px-4 py-8 w-full flex items-start justify-center">
            @yield('content')
        </main>
        @include('includes.footer')
    </div>
</body>

<script>
    $('#backdrop').click(function() {
        $('#backdrop').fadeOut();
        $('#loginModal').fadeOut();
        $('#registerModal').fadeOut();
    })
</script>
@stack('scripts')


</html>
