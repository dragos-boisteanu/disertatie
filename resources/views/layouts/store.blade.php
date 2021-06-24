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

    <!-- Scripts -->

    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@2.4.21/dist/js/splide.min.js"></script>
</head>

<body class="h-full">
    <div id="store-app" class="h-full flex flex-col">
        @include('includes.header')
        <main class="flex-1 bg-gray-900 px-4 py-8 w-full flex items-start justify-center">
            @yield('content')
        </main>
        @include('includes.footer')
    </div>
</body>
<script src="{{ asset(mix('js/app.js')) }}"></script>
<script>
    const backdrop = document.getElementById('backdrop');

    backdrop.addEventListener('click', function() {
        backdrop.style.display = "none"

        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm')

        if (!registerForm.classList.contains('hidden')) {
            registerForm.classList.add('hidden');
        }

        if (!loginForm.classList.contains('hidden')) {
            loginForm.classList.add('hidden');
        }

    })
</script>
@stack('scripts')


</html>
