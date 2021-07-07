@extends('layouts.store')

@section('content')
    <x-menu>
        @include('includes.menu-categories')
        @include('includes.menu-categories-select')
        <div class="w-full h-full lg:w-2/5 mt-4 text-gray-700 text-opacity-75 text-4xl flex items-center justify-center font-semibold">
            Alege o categorie
        </div>
    </x-menu>
@endsection
