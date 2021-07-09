<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-screen">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Checkout</title>

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
        <div class="h-full w-full md:w-4/5 lg:w-3/5 2xl:w-1/2">
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
                    @foreach ($cart->items as $item)
                        <li class="grid grid-cols-12 border-b border-gray-400 last:border-0 ">
                            <div
                                class="col-start-1 col-end-3 text-sm flex items-center justify-center border-r border-gray-300">
                                {{ $loop->iteration }}
                            </div>
                            <div class="col-start-3 col-end-11 w-full md:flex md:items-center">
                                <div class="w-full p-2 md:flex-1">
                                    <div class="font-semibold">
                                        {{ $item->name }}
                                    </div>
                                    <div class="text-sm text-gray-800">
                                        @foreach ($item->ingredients as $ingredient)
                                            {{ $ingredient->name }},
                                        @endforeach
                                    </div>
                                </div>
                                <div class="md:border-l md:border-gray-30 md:flex-1">
                                    <div
                                        class="flex items-center justify-between p-2 border-t border-b border-gray-300">
                                        <div class="flex-initial w-20">
                                            <form method="POST"
                                                action="{{ route('cart.patch', ['id' => $item->id]) }}"
                                                class="text-center flex flex-col justify-center gap-y-2">
                                                @csrf
                                                @method('PUT')
                                                <input type="number" name="quantity"
                                                    value="{{ $item->pivot->quantity }}"
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
                            </div>
                            <div
                                class="col-start-11 col-end-13 flex flex-col items-center justify-center font-semibold border-l border-gray-300 text-sm">
                                <div>Total</div>
                                <div class="text-center">{{ $item->price * $item->pivot->quantity }} Ron</div>
                            </div>
                        </li>
                    @endforeach
                </ul>
                <div class="my-4 bg-trueGray-50 rounded p-2 flex items-center justify-end gap-x-4">
                    <div class="font-semibold">
                        Total produse
                    </div>
                    <div>
                        {{ $cart->totalValue }} Ron
                    </div>
                </div>
            </div>

            <form method="POST" action="{{ route('order.store') }}">
                @csrf

                <div class="w-full md:flex md:items-start md:gap-x-4">
                    <div class="flex-1">
                        <h2 class="text-lg text-trueGray-300 my-4 pl-2">Adresa</h2>
                        <div id="deliveryMethod" class="bg-trueGray-50 rounded shadow-md mb-3 md:mb-0">
                            <ul class="flex items-center justify-between gap-x-2 py-2 px-4 text-sm text-trueGray-700">
                                @foreach ($deliveryMethods as $deliveryMethod)
                                    <li>
                                        <input id="dm{{ $deliveryMethod->id }}" type="radio" name="deliveryMethodId"
                                            value="{{ $deliveryMethod->id }}" @if ($deliveryMethod->id == old('deliveryMethodId')) checked @endif @if ($deliveryMethod->isDisabled) disabled
                                @endif
                                />
                                <label for="dm{{ $deliveryMethod->id }}">
                                    {{ $deliveryMethod->name }}</label>
                                <div>
                                    (<span id="dmp{{ $deliveryMethod->id }}">{{ $deliveryMethod->price }}</span>
                                    Ron)
                                </div>
                                </li>
                                @endforeach
                            </ul>
                        </div>
                        @if ($errors->has('deliveryMethod'))
                            <div class="text-sm font-semibold text-red-600 mt-2">
                                {{ $errors->first('deliveryMethod') }}</div>
                        @endif
                    </div>

                    <div class="flex-1 flex flex-col">
                        <h2 class="text-lg text-trueGray-300 my-4 pl-2">Metode de plata</h2>
                        <ul
                            class="flex items-center justify-between py-2 px-4 text-sm text-trueGray-700 bg-trueGray-50 rounded shadow-md">
                            @foreach ($paymentMethods as $paymentMethod)
                                <li>
                                    <input id="pm{{ $paymentMethod->id }}" type="radio" name="paymentMethod"
                                        value="{{ $paymentMethod->id }}" @if ($paymentMethod->id == old('paymentMethod')) checked @endif @if ($paymentMethod->isDisabled) disabled
                            @endif />
                            <label for="pm1">{{ $paymentMethod->name }}</label>
                            </li>
                            @endforeach
                        </ul>
                        @if ($errors->has('paymentMethod'))
                            <div class="text-sm font-semibold text-red-600 mt-2">
                                {{ $errors->first('paymentMethod') }}</div>
                        @endif
                    </div>
                </div>

                <div>
                    <h2 class="text-lg text-trueGray-300 my-4 pl-2">Observatii</h2>
                    <textarea class="flex-1 w-full border p-2 text-sm rounded focus:ring focus:ring-orange-600"
                        name="observations"></textarea>
                </div>

                <div class="my-4 bg-trueGray-50 rounded p-2 flex items-center justify-end gap-x-4">
                    <div class="font-semibold">
                        Total comanda
                    </div>
                    <div>
                        <span id="orderTotalValue">{{ $orderTotalValue }}</span> Ron
                    </div>
                </div>

                <div class="w-full lg:text-right">
                    <button type="submit" class="
                    w-full
                    rounded-sm
                    text-white
                    bg-green-600
                    px-4
                    py-1
                    active:shadow-inner
                    hover:bg-green-500
                    lg:w-auto
                  ">
                        Trimite comanda
                    </button>
                </div>
            </form>

        </div>

    </main>
</body>
<script src="{{ asset(mix('js/app.js')) }}"></script>
<script>
    const auth = "{{ Auth::check() }}"

    @auth
        const authAddress =
        `
        <select id="deliveryAddressSelect" name="deliveryAddress"
            class="w-full border p-2 text-sm rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('deliveryAddress')) !border-red-600 @endif">
            <option value="" selected disabled>Alege adresa de livrare</option>
            @foreach ($addresses as $address)
                <option value="{{ $address->id }}" @if ($address->is_selected && old('deliveryAddress') == '') selected
                        @elseif (old('deliveryAddress') == $address->id && old('deliveryAddress') != 'new')
                                selected @endif>
                    {{ $address->address }}
                </option>
            @endforeach
            <option value="new" @if (old('deliveryAddress') == 'new') selected @endif>Adresa noua</option>
        </select>
        @if ($errors->has('deliveryAddress'))
            <div class="text-xs font-semibold text-red-600 mt-2">{{ $errors->first('deliveryAddress') }}</div>
        @endif
        `
    
        const newAddressField =
        `
        <div id="newAddressField">
            <div class="w-full">
                <div class="w-full mt-4">
                    <input type="text" id="newAddress" name="newAddress" value="{{ old('newAddress') }}"
                        class="w-full text-sm border p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('newAddress')) !border-red-600 @endif"
                    placeholder="Adresa">
                    @if ($errors->has('newAddress'))
                        <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">
                            {{ $errors->first('newAddress') }}</div>
                    @endif
                </div>
            </div>
        </div>
        `;
    @endauth

    @guest
        const guestAddress =
        `
        <div class="w-full">
            <input type="text" id="name" name="name" value="{{ old('name') }}"
                class="w-full border p-2 text-sm rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('name')) !border-red-600 @endif" placeholder="Nume">
            @if ($errors->has('name'))
                <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">{{ $errors->first('name') }}
                </div>
            @endif
        </div>
    
        <div class="w-full mt-4">
            <input type="email" id="email" name="email" value="{{ old('email') }}"
                class="w-full text-sm border p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('email')) !border-red-600 @endif" placeholder="Email">
            @if ($errors->has('email'))
                <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">{{ $errors->first('email') }}
                </div>
            @endif
        </div>

        <div class="w-full mt-4">
            <input type="text" id="phoneNumber" name="phoneNumber" value="{{ old('phoneNumber') }}"
                class="w-full border p-2 text-sm rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('phoneNumber')) !border-red-600 @endif" placeholder="Numar telefon">
            @if ($errors->has('phoneNumber'))
                <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">
                    {{ $errors->first('phoneNumber') }}</div>
            @endif
        </div>
    
        <div class="w-full mt-4">
            <input type="text" id="address" name="address" value="{{ old('address') }}"
                class="w-full text-sm border p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('address')) !border-red-600 @endif" placeholder="Adresa">
            @if ($errors->has('address'))
                <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">{{ $errors->first('address') }}
                </div>
            @endif
        </div>
        `
    
        const localDeliveryData =
        `
        <div id="localDeliveryData" class="p-4 border-t border-gray-800">
            <div class="w-full">
                <input type="text" id="name" name="name" value="{{ old('name') }}"
                    class="w-full border p-2 text-sm rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('name')) !border-red-600 @endif" placeholder="Nume">
                @if ($errors->has('name'))
                    <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">
                        {{ $errors->first('name') }}</div>
                @endif
            </div>
    
            <div class="w-full mt-4">
                <input type="email" id="email" name="email" value="{{ old('email') }}"
                    class="w-full border p-2 text-sm rounded-sm focus:ring focus:ring-orange-600  @if ($errors->has('email')) !border-red-600 @endif" placeholder="Email">
                @if ($errors->has('email'))
                    <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">
                        {{ $errors->first('email') }}</div>
                @endif
            </div>
    
            <div class="w-full mt-4">
                <input type="text" id="phoneNumber" name="phoneNumber" value="{{ old('phoneNumber') }}"
                    class="w-full border p-2 text-sm rounded-sm focus:ring focus:ring-orange-600  @if ($errors->has('phoneNumber')) !border-red-600 @endif" placeholder="Numar telefon">
                @if ($errors->has('phoneNumber'))
                    <div class="text-xs font-semibold text-red-600 mt-2 backend-validation-error">
                        {{ $errors->first('phoneNumber') }}</div>
                @endif
            </div>
    
        </div>
    
        `
    
        if($('input[name=deliveryMethodId]:checked').val() == 2) {
            $('#deliveryMethod').append(localDeliveryData);
        }
    @endguest

    const deliveryMethodAddress =
        `
        <div id="deliveryMethodAddress" class="p-4 border-t border-gray-800">
           @auth
               ${authAddress}
           @endauth

           @guest
               ${guestAddress}
           @endguest
        </div>
    `

    const deliveryMethod = $('input[name=deliveryMethodId]');
    const orderTotalValue = $('#orderTotalValue');

    $('input[name=deliveryMethodId]').change(function() {
        $('.backend-validation-error').each( (index, element) => {
            element.remove();
        })

        $('.\\!border-red-600').each( (index, element) => {
            element.value = ""
            element.classList.remove('!border-red-600');
        })
    });



    if ($('input[name=deliveryMethodId]:checked').val() == 1) {

        $('#deliveryMethod').append(deliveryMethodAddress);

        $('#deliveryAddressSelect').change(function() {
            if ($(this).val() === 'new') {
                $('#deliveryMethodAddress').append(newAddressField);
            } else {
                $('#newAddressField').remove();
            }
        })

        if ($('#deliveryAddressSelect').val() == 'new') {
            $('#deliveryMethodAddress').append(newAddressField);
        }
    }

    $('input[name=deliveryMethodId]').click(function(event) {

        const deliveryMethodRadioValue = $(this).val();
        const deliveryMehtodPrice = $(`#dmp${deliveryMethodRadioValue}`);

        orderTotalValue.html((parseFloat(deliveryMehtodPrice.html()) + 24.23).toFixed(2))

        if (deliveryMethodRadioValue == 1) {
            $('#localDeliveryData').remove();
            if ($('#deliveryMethod').find('#deliveryMethodAddress').length === 0) {
                $('#deliveryMethod').append(deliveryMethodAddress);

                if (auth) {
                    const deliveryMethodAddress = $('#deliveryMethodAddress');
                    const deliveryAddressSelect = $('#deliveryAddressSelect');

                    deliveryAddressSelect.change(function() {
                        if ($(this).val() === 'new') {
                            deliveryMethodAddress.append(newAddressField);
                        } else {
                            $('#newAddressField').remove();
                        }
                    })

                    if (deliveryAddressSelect.val() == 'new') {
                        deliveryMethodAddress.append(newAddressField);
                    }
                }
            }
        } else if (deliveryMethodRadioValue == 2 && !auth) {
            $('#deliveryMethodAddress').remove();
            if ($('#deliveryMethod').find('#localDeliveryData').length === 0) {
                $('#deliveryMethod').append(localDeliveryData);
            }
        } else {
            $('#localDeliveryData').remove();
            $('#deliveryMethodAddress').remove();
        }
    });
</script>

</html>
