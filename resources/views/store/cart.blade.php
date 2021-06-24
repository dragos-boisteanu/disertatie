<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-screen">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Cart</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">

    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@2.4.21/dist/js/splide.min.js"></script>
</head>

<body class="h-full">
    <main id="store-app" class="bg-gray-900 px-4 py-8 w-full flex items-center justify-center">
        <div class="w-full  md:w-2/3 lg:w-1/4">
            <a href="{{ route('menu-index') }}" class="text-sm text-orange-600 flex items-center hover:underline">
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24"
                    width="18px">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                </svg>
                Inapoi la meniu
            </a>
            <h1 class="text-3xl text-trueGray-300 my-4 pl-2">Cart</h1>
            <ul>
                @foreach ($cart->items as $item)
                    <li class="grid grid-cols-7 bg-white rounded shadow-md mt-3 first:mt-0">
                        <div class="col-start-1 col-end-2  flex items-center justify-center border-r border-gray-300">
                            {{ $loop->iteration }}
                        </div>
                        <div class="col-start-2 col-end-7 w-full">
                            <div class="w-full p-2">
                                <div class="font-semibold">
                                    {{ $item->name }}
                                </div>
                                <div class="text-sm text-gray-800">
                                    @foreach ($item->ingredients as $ingredient)
                                        {{ $ingredient->name }},
                                    @endforeach
                                </div>
                            </div>
                            <div
                                class="flex items-center justify-between gap-x-4 p-2 border-t border-b border-gray-300">
                                <div class="flex-initial w-20">
                                    <form method="POST" action="{{ route('cart-patch', ['id'=>$item->id]) }}" class="text-center flex flex-col justify-center gap-y-1">
                                        @csrf
                                        @method('PUT')
                                        <input type="number" value="{{ $item->pivot->quantity }}"
                                            class="text-center bg-white rounded-sm border border-trueGray-400 text-sm " />
                                        <button class="text-sm text-sky-700 hover:text-sky-500">Actualizeaza</button>
                                    </form>
                                </div>
                                <div class="flex-1 text-sm text-center font-semibold">
                                    {{ $item->price }} Ron / buc.
                                </div>
                                <form class="flex-1" method="POST" action="/">
                                    @csrf
                                    <button class="w-full text-sm text-center text-red-600">
                                        Sterge
                                    </button>
                                </form>
                            </div>
                            <div class="flex items-center justify-between p-2 text-sm">
                                <div class="text-center">
                                    <div>
                                        {{ $item->base_price }} Ron
                                    </div>
                                    <div class="font-bold">
                                        Pret initial
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div>
                                        9 %
                                    </div>
                                    <div class="font-bold">
                                        VAT
                                    </div>
                                </div>
                                <div class="text-center">
                                    {{-- @if ($item->discount) --}}
                                    <div>
                                        - 2 %
                                    </div>
                                    <div class="font-bold">
                                        Reducere
                                    </div>
                                    {{-- @endif --}}
                                </div>
                            </div>
                        </div>
                        <div
                            class="col-start-7 col-end-8 flex flex-col items-center justify-center font-semibold border-l border-gray-300 text-sm">
                            <div>Total</div>
                            <div class="text-center">{{ $item->price * $item->pivot->quantity }} Ron</div>
                        </div>
                    </li>
                @endforeach
            </ul>
            <form method="GET" action="/" class="pt-5">
                <button class="
                        w-full
                        rounded-sm
                        text-white
                        bg-green-600
                        px-4
                        py-1
                        active:shadow-inner
                        hover:bg-green-500
                      ">
                    Checkout
                </button>
            </form>
        </div>
    </main>
</body>
<script src="{{ asset(mix('js/app.js')) }}"></script>

@stack('scripts')

</html>
