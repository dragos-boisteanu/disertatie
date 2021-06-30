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
            <h1 class="text-3xl text-trueGray-300 my-4 pl-2">Rezumant comanda</h1>

            <div>
                <h2 class="text-lg text-trueGray-300 my-4 pl-2">Produse</h2>
                <ul class="bg-trueGray-50 rounded shadow-md mb-3">
                    @foreach ($items as $item)
                        <li class="grid grid-cols-7 border-b last:border-0">
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
                                        <form method="POST" action="{{ route('cart.patch', ['id' => $item->id]) }}"
                                            class="text-center flex flex-col justify-center gap-y-2">
                                            @csrf
                                            @method('PUT')
                                            <input type="number" name="quantity" value="{{ $item->pivot->quantity }}"
                                                class="text-center bg-white rounded-sm border border-trueGray-400 text-sm " />
                                            <button
                                                class="text-sm text-sky-700 hover:text-sky-500">Actualizeaza</button>
                                        </form>
                                    </div>
                                    <div class="flex-initial text-sm text-center font-semibold">
                                        {{ $item->price }} Ron / buc.
                                    </div>
                                    <form class="flex-initial" method="POST"
                                        action="{{ route('cart.delete', ['id' => $item->id]) }}">
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
                    @endforeach
                </ul>
            </div>

            <div>
                <h2 class="text-lg text-trueGray-300 my-4 pl-2">Adresa</h2>
                <div class="bg-trueGray-50 rounded shadow-md mb-3">
                    <ul class="flex items-center justify-between py-2 px-4 text-sm text-trueGray-700">
                        @foreach ($deliveryMethods as $deliveryMethod)
                            <li>
                                <input id="d{{ $deliveryMethod->id }}" type="radio" name="deliveryMethod"
                                    value="{{ $deliveryMethod->id }}" />
                                <label for="d{{ $deliveryMethod->id }}"> {{ $deliveryMethod->name }}</label>
                                <div>
                                    ({{ $deliveryMethod->price }} Ron)
                                </div>
                            </li>
                        @endforeach
                    </ul>
                    {{-- if home delivery is selected 
                            show option to select existing add 
                            or fileds for a new address
                            if new address is selected from the select --}}
                    <div class="p-4 border-t border-gray-800">
                        @auth

                            <div class="w-full">
                                <label for="phoneNumber" class="block text-trueGray-400 font-semibold mb-2">Nr.
                                    Telefon</label>
                                {{-- error zone --}}
                                <input type="text" id="phoneNumber" name="phoneNumber"
                                    value="{{ old('phoneNumber', Auth::user()->phone_number) }}"
                                    class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
                            </div>

                            <select name="deliveryAddress">
                                <option value="" selected disabled>Alege adresa de livrare</option>
                                @foreach ($addresses as $address)
                                    <option value="{{ $address->id }}">{{ $address->address }}</option>
                                @endforeach
                            </select>
                        @endauth

                        @guest
                            <div class="w-full">
                                <label for="phoneNumber" class="block text-trueGray-700 text font-semibold mb-2">Nr.
                                    Telefon</label>
                                {{-- error zone --}}
                                <input type="text" id="phoneNumber" name="phoneNumber" value="{{ old('phoneNumber') }}"
                                    class="w-full border p-2 text-sm rounded-sm focus:ring focus:ring-orange-600">
                            </div>

                            <div class="w-full mt-4">
                                <label for="email" class="block text-trueGray-700 text font-semibold mb-2">Adresa
                                    email</label>
                                {{-- error zone --}}
                                <input type="text" id="email" name="email" value="{{ old('email') }}"
                                    class="w-full text-sm border p-2 rounded-sm focus:ring focus:ring-orange-600 shadow-inner">
                            </div>
                        @endguest



                    </div>
                </div>
            </div>

            <div>
                <h2 class="text-lg text-trueGray-300 my-4 pl-2">Metode de plata</h2>
                <ul
                    class="flex items-center justify-between py-2 px-4 text-sm text-trueGray-700 bg-trueGray-50 rounded shadow-md mb-3">
                    <li>
                        <input id="p1" type="radio" name="paymentMethod" value="1" />
                        <label for="p1">Cash</label>
                    </li>
                    <li>
                        <input id="p2" type="radio" disabled name="paymentMethod" value="2" />
                        <label for="p2">Card</label>
                    </li>
                    <li>
                        <input id="p3" type="radio" disabled name="paymentMethod" value="3" />
                        <label for="p3">Card online</label>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</body>
<script src="{{ asset(mix('js/app.js')) }}"></script>

</html>
