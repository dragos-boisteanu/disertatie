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

    {{-- Scripts --}}
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>

<body class="h-full flex flex-col">
    <main id="store-app" class="flex-1 bg-gray-800 px-4 py-8 w-full flex items-center justify-center">
        <div class="h-full w-full  md:w-2/3 lg:w-1/4">
            <a href="{{ route('menu-index') }}" class="text-sm text-orange-600 flex items-center hover:underline">
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24"
                    width="18px">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                </svg>
                Inapoi la meniu
            </a>
            @if (session('message'))
                <div id="notification"
                    class="w-full animate__animated bg-blue-500 font-medium text-sm text-white rounded p-4 my-2">
                    {{ session('message') }}
                </div>
            @endif
            <h1 class="text-3xl text-trueGray-300 my-4 pl-2">Cos cumparaturi</h1>
            <ul>
                @forelse ($cart->items as $item)
                    <li class="grid grid-cols-7 bg-trueGray-50 rounded shadow-md mt-3 first:mt-0">
                        <div
                            class="col-start-1 col-end-2  text-sm flex items-center justify-center border-r border-gray-300">
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
                            <div class="flex items-center justify-between p-2 border-t border-b border-gray-300">
                                <div class="flex-initial w-20">
                                    <form method="POST" action="{{ route('cart-patch', ['id' => $item->id]) }}"
                                        class="text-center flex flex-col justify-center gap-y-2">
                                        @csrf
                                        @method('PUT')
                                        <input type="number" name="quantity" value="{{ $item->pivot->quantity }}"
                                            class="text-center bg-white rounded-sm border border-trueGray-400 text-sm " />
                                        <button class="text-sm text-sky-700 hover:text-sky-500">Actualizeaza</button>
                                    </form>
                                </div>
                                <div class="flex-initial text-sm text-center font-semibold">
                                    {{ $item->price }} Ron / buc.
                                </div>
                                <form class="flex-initial" method="POST"
                                    action="{{ route('cart-delete', ['id' => $item->id]) }}">
                                    @csrf
                                    @method("DELETE")
                                    <button class="w-full text-sm text-center text-red-700 hover:text-red-500">
                                        Sterge
                                    </button>
                                </form>
                            </div>
                            <div class="flex items-center justify-between p-2 text-sm">
                                <div class="text-center flex-initial w-20">
                                    <div>
                                        {{ $item->base_price }} Ron
                                    </div>
                                    <div class="font-bold text-xs">
                                        Pret initial
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div>
                                        9 %
                                    </div>
                                    <div class="font-bold text-xs">
                                        VAT
                                    </div>
                                </div>
                                <div class="text-center">
                                    {{-- @if ($item->discount) --}}
                                    <div>
                                        - 2 %
                                    </div>
                                    <div class="font-bold text-xs">
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
                @empty
                    <div class="w-full bg-blue-500 font-medium text-sm text-white rounded p-4 my-2">
                        Cosul de cumparaturi este gol
                    </div>
                @endforelse
            </ul>
            @if($cart->items->count() > 0)
                <div class="my-4 bg-trueGray-50 rounded p-2 flex items-center justify-end gap-x-4">
                    <div class="font-semibold">
                        TOTAL
                    </div>
                    <div>
                        {{ $cart->totalValue }} Ron
                    </div>
                </div>
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
            @endif
        </div>
    </main>
</body>
<script src="{{ asset(mix('js/app.js')) }}"></script>
<script>
    $(document).ready(function() {
        const notificaiton = $('#notification');

        if (notificaiton) {
            setTimeout(function() {
                notificaiton.fadeOut('slow');
            }, 2000)
        }

    })
</script>

</html>
