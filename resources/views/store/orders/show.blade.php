@extends('layouts.store')


@section('content')
    <div class="w-full lg:w-2/4 2xl:w-1/3">
        <a href=" {{ route('orders.index') }}" class="text-sm text-orange-600 flex items-center hover:underline">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
            </svg>
            Inapoi la lista comenzilor
        </a>

        <div class="flex flex-wrap items-center justify-between">
            <h1 class="text-4xl my-4 pl-2 font-semibold text-trueGray-300 ">Comanda #{{ $order->id }} </h1>
            <div class="text-xs py-1 px-2 rounded-sm font-semibold
                        @if ($order->status->name == 'Canceled') bg-red-300
                text-red-900 @endif
                @if ($order->status->name == 'Received') bg-blue-300 text-blue-900
                @endif
                @if ($order->status->name == 'Completed') bg-green-300 text-green-900
                @endif
                ">
                {{ $order->status->name }}
            </div>
        </div>

        <div>
            <h2 class="text-lg text-trueGray-300 my-4 pl-2">Detalii comanda</h2>
            <div class="text-sm bg-trueGray-50 rounded shadow-md p-2 flex flex-col gap-y-2 ">
                <div>
                    <span class="font-semibold">Creata in data de: </span>
                    <span>{{ $order->created_at }}</span>
                </div>
                <div>
                    <span class="font-semibold">Ultimul update: </span>
                    <span>{{ $order->updated_at }}</span>
                </div>
                <div>
                    <span class="font-semibold">Metoda livrare: </span>
                    <span>{{ $order->deliveryMethod->name }}  <span class="italic tex-sm text-trueGray-700">({{ $order->deliveryMethod->price }} Ron)</span></span>
                </div>

                @if ($order->deliveryMethod->isTable)
                    <div>
                        <span class="font-semibold">Masa: </span>
                        <span>{{ $order->table->name }}</span>
                    </div>
                @elseIf($order->deliveryMethod->isDelivery)
                    <div>
                        <span class="font-semibold">Adresa: </span>
                        <span>{{ $order->address }}</span>
                    </div>
                @endif

                @isset($order->staff)
                    <div>
                        <span class="font-semibold">Operator: </span>
                        <span>{{ $order->staff->fullName }}</span>
                    </div>
                @endisset

                @isset($order->observations)
                    <div>
                        <span class="font-semibold">Observatii: </span>
                        <pre>{{ $order->observations }}</pre>
                    </div>
                @endisset

            </div>
        </div>

        <div>
            <h2 class="text-lg text-trueGray-300 my-4 pl-2">Produse</h2>
            <ul class="bg-trueGray-50 rounded shadow-md mt-3">
                @foreach ($order->products as $item)
                    <li class="grid grid-cols-12 border-t border-gray-300">
                        <div
                            class="col-start-1 col-end-3 text-sm flex items-center justify-center border-r border-gray-300">
                            {{ $loop->iteration }}
                        </div>
                        <div class="col-start-3 col-end-11 w-full md:flex md:items-center">
                            <div class="w-full p-2 md:flex-1 ">
                                <div class="font-semibold">
                                    {{ $item->name }}
                                </div>
                                <div class="text-sm text-trueGray-700">
                                    @foreach ($item->ingredients as $ingredient)
                                        {{ $ingredient->name }},
                                    @endforeach
                                </div>
                            </div>
                            <div class="h-full md:border-l md:border-gray-30 md:flex-1">
                                <div class="flex items-center justify-between py-2 px-4 border-b border-gray-300">

                                    <div class="text-sm text-gray-800">x{{ $item->pivot->quantity }} buc.</div>

                                    <div class="flex-initial text-sm text-center font-semibold">
                                        {{ $item->price }} Ron / buc.
                                    </div>

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
        </div>

        <div class="my-4 bg-trueGray-50 rounded p-2 flex items-center justify-end gap-x-4">
            <div class="font-semibold text-center">
                <div>TOTAL</div>
                <div class="text-xs italic text-trueGray-700">(include taxa de transport)</div>
            </div>
            <div>
                {{ $order->totalValue }} Ron
            </div>
        </div>
    </div>

@endsection
