@extends('layouts.store')

@section('content')
    <x-menu>
        @include('includes.menu-categories')
        @include('includes.menu-categories-select')
        <ul class="mt-4 text-gray-600 w-full">
            @if ($category->subCategories->count() > 0)
                @foreach ($category->subCategories as $subCategory)
                    @if ($subCategory->subProducts->count() > 0)
                        <li class="w-full pb-4 border-b border-gray-600 mb-4 last:border-b-0 last:border-trueGray-700">
                            <h1 class="font-semibold text-xl mb-2 text-orange-600">{{ $subCategory->name }}</h1>
                            <ul>
                                @foreach ($subCategory->subProducts as $product)
                                    <x-product :product="$product"></x-product>
                                @endforeach
                            </ul>
                        </li>
                    @endif
                @endforeach
            @else
                @foreach ($category->products as $product)
                    <x-product :product="$product"></x-product>
                @endforeach
            @endif
        </ul>
    </x-menu>
@endsection
