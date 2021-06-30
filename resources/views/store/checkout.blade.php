<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-screen">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Cos cumparaturi</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

    {{-- Scripts --}}
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
</head>

<body class="h-full flex flex-col">
    {!! Toastr::message() !!}
    <main id="store-app" class="flex-1 bg-gray-800 px-4 py-8 w-full flex items-center justify-center">
        <div class="h-full w-full  md:w-2/3 lg:w-1/4">
            <a href=" {{ route('menu.index') }}" class="text-sm text-orange-600 flex items-center hover:underline">
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24"
                    width="18px">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                </svg>
                Inapoi la meniu
            </a>
            <h1 class="text-3xl text-trueGray-300 my-4 pl-2">Checkout</h1>
           
                
        </div>
    </main>
</body>
<script src="{{ asset(mix('js/app.js')) }}"></script>

</html>
