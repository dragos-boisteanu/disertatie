@extends('layouts.store')


@section('content')
    <h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Rezervarile mele</h1>

    <div class="mb-4 pb-4 border-b">
        <h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Rezerva masa</h2>
        <form method="POST" action="/">
            @csrf

            <div class="w-full flex flex-col gap-4 md:flex-row md:items-center">
                    <label for="address" class="block text-trueGray-400 font-semibold mb-2">Data si ora</label>
                    {{-- error zone --}}
                    <input id="addressInput" type="text" id="address" name="address" value="{{ old('newAddress') }}"
                        class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600"
                        placeholder="Strada, Nr, Bloc/Casa, Apartament, Etaj...">

            </div>

            <div class="w-full lg:text-right mt-4">
                <button id="addressBtn" type="submit"
                    class="w-full lg:w-auto bg-green-600 hover:bg-green-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
                    Rezerva
                </button>
            </div>
        </form>
    </div>
@endsection
