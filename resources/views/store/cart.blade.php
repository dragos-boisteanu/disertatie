@extends('layouts.store')

@section('content')
    <div class="w-full  md:w-2/3 lg:w-1/4">
        <h1 class="text-3xl text-trueGray-300 mb-4 pl-2">Cart</h1>
        <ul>
            @foreach ($cart->items as $item)
                <li class="grid grid-cols-6 bg-white rounded shadow-md mt-3 first:mt-0">
                    <div class="col-start-1 col-end-2  flex items-center justify-center border-r border-black">
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
                        <div class="flex items-center justify-between gap-x-4 p-2 border-t border-b border-black">
                            <div class="flex-initial w-20">
                                <update-quantity-component :prop-quantity="{{ $item->pivot->quantity }}"
                                    :id="{{ $item->id }}"></update-quantity-component>
                            </div>
                            <div class="flex-1 text-sm text-center font-semibold">
                                {{ $item->price }} Ron
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
                </li>
            @endforeach
        </ul>
        <form method="GET" action="/" class="mt-5">
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
@endsection
