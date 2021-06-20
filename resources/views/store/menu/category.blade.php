@extends('layouts.store')

@section('content')
    <div class="w-full h-full flex items-start gap-x-10 justify-center">
        @include('includes.menu-categories')
        <ul class="text-gray-600 w-1/2">
            {{-- <li>
                <h1 class="font-bold text-3xl text-orange-600">{{ $category->name }}</h1>
            </li> --}}
            @foreach ($category->subCategories as $subCategory)
                <li>
                    <h2>{{ $subCategory->name }}</h2>
                    <ul>
                        @foreach ($subCategory->subProducts as $product)
                            <div>
                                {{ $product->name }}
                            </div>
                            <ul>
                                <li class="">
                                    @foreach ($product->ingredients as $ingredient)
                                        {{ $ingredient->name }},
                                    @endforeach
                                </li>
                            </ul>
                            <div>
                                Final price: {{$product->price}}
                            </div>

                        @endforeach
                    </ul>
                </li>
            @endforeach
        </ul>
    </div>
@endsection
