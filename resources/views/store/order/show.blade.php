@extends('layouts.store')


@section('content')
    <div class="w-full lg:w-2/4 2xl:w-1/3">
        <a href=" {{ route('order.index') }}" class="text-sm text-orange-600 flex items-center hover:underline">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
            </svg>
            Inapoi la lista comenzilor
        </a>

        <h1 class="text-4xl my-4 pl-2 font-semibold text-trueGray-300 ">Comanda #{{ $order->id }} </h1>
        <ul>
            @foreach ($order->products as $item)
                <li class="grid grid-cols-12 bg-trueGray-50 rounded shadow-md mt-3 first:mt-0">
                    <div class="col-start-1 col-end-3 text-sm flex items-center justify-center border-r border-gray-300">
                        {{ $loop->iteration }}
                    </div>
                    <div class="col-start-3 col-end-11 w-full md:flex md:items-center">
                        <div class="w-full p-2 md:flex-1 ">
                            <div class="font-semibold">
                                {{ $item->name }}
                            </div>
                            <div class="text-sm text-gray-800">
                                @foreach ($item->ingredients as $ingredient)
                                    {{ $ingredient->name }},
                                @endforeach
                            </div>
                        </div>
                        <div class="h-full md:border-l md:border-gray-30 md:flex-1">
                            <div class="flex items-center justify-between py-2 px-4 border-b border-gray-300">
                                
                                <div class="text-sm text-gray-800">{{ $item->pivot->quantity }} buc.</div>
                               
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

        <div class="my-4 bg-trueGray-50 rounded p-2 flex items-center justify-end gap-x-4">
            <div class="font-semibold">
                TOTAL
            </div>
            <div>
                {{ $order->totalValue }} Ron
            </div>
        </div>
    </div>

@endsection
