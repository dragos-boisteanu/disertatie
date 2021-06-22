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
    <script src="{{ asset(mix('js/app.js')) }}" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@2.4.21/dist/js/splide.min.js"></script>
</head>

<body class="h-full flex flex-col">
    @include('includes.header')
    <main class="flex-1 bg-gray-900 px-4 py-8">
        @yield('content')
    </main>
    @include('includes.footer')
</body>
<script>

</script>
@stack('scripts')
<script>
    const backdrop = document.getElementById("backdrop");

    backdrop.addEventListener("click", function() {
        if (!backdrop.classList.contains('hidden')) {
            backdrop.classList.add('hidden');


            if (mobileSlider && !mobileSlider.classList.contains('hidden')) {
                mobileSlider.classList.add('hidden');
            }
 
            if (authModal && !authModal.classList.contains('hidden')) {
                authModal.classList.add('hidden');
            }
        }
    })
</script>

</html>
