@extends('layouts.store')

@section('content')
    <x-menu>
        @include('includes.menu-categories')
        @include('includes.menu-categories-select')
        <ul class="mt-4 text-gray-600 w-full lg:w-2/5">
            @foreach ($category->subCategories as $subCategory)
                <li class="pb-2 border-b border-gray-600  mb-4 last:border-b-0 last:border-red-700">
                    <h1 class="font-semibold text-xl mb-2 text-orange-600">{{ $subCategory->name }}</h1>
                    <ul>
                        @foreach ($subCategory->subProducts as $product)
                            <li class="mb-4 w-full grid grid-cols-3 gap-y-4 md:grid-cols-5 product-form">

                                <div class="col-span-3 md:col-span-2">
                                    <h2 class="text-gray-400 mb-1 justify-self-start self-center">
                                        {{ $product->name }} - {{ $product->weight }}{{ $product->unit->name }}
                                    </h2>
                                    <ul class="">
                                        <li class="text-sm text-gray-500">
                                            @foreach ($product->ingredients as $ingredient)
                                                {{ $ingredient->name }},
                                            @endforeach
                                        </li>
                                    </ul>
                                </div>
                                <div class="text-sm self-center px-4 md:px-8">
                                    <input id="pq{{ $product->id }}" type="number" value="1" min-value="1"
                                        class="w-full rounded-sm bg-white text-center product-quantity ">
                                </div>
                                <div class="text-sm text-gray-300 self-center justify-self-center">
                                    {{ $product->price }} Ron
                                </div>
                                <button id="{{ $product->id }}"
                                    class="self-center py-1 px-2 text-sm rounded border border-gray-400 text-gray-400 hover:text-gray-200 hover:border-gray-200 product-add-to-cart">
                                    Add to cart
                                </button>
                            </li>
                        @endforeach
                    </ul>
                </li>
            @endforeach
        </ul>
    </x-menu>
@endsection


@push('scripts')
    <script>
        const productQuantities = Array.from(document.querySelectorAll('.product-quantity'))
        const productAddToCartBtn = document.querySelectorAll('.product-add-to-cart')

        productAddToCartBtn.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const productQuantity = productQuantities.filter(quantity => quantity.id.substring(2) == btn
                    .id)[0];

                const product = {
                    productId: btn.id,
                    productQuantity: productQuantity.value
                }

                axios.post('/api/client/cart', product).then(response => {
                    const cartQuantity = document.getElementById('cartQuantity');
                    cartQuantity.innerHTML = response.data.count;
                }).catch(error => {
                    console.log(error)
                })
            })
        })
    </script>
@endpush
