@props(['product'])

<li class="mb-4 last:mb-0">
    <form method="POST" action="{{ route('carts.store', ['productId' => $product->id]) }}"
        class="mb-4 w-full grid grid-cols-3 gap-y-4 md:grid-cols-5">
        @csrf

        <div class="col-span-3 md:col-span-2 flex flex-col items-start">
            <a class="relative block"
                href="{{ route('products.show', ['categorySlug' => $product->category->slug, 'subCategorySlug' => $product->subCategory->slug, 'productSlug' => $product->slug]) }}">
                <h2 class="text-gray-300 mb-1 justify-self-start self-center hover:text-gray-200 hover:underline">
                    {{ $product->name }} -
                    {{ $product->weight }}{{ $product->unit->name }}
                </h2>

                @isset($product->finalDiscount)
                    <div class="absolute text-xs -top-2 @if ($product->finalDiscount >= 10) -right-16 @else -right-14 @endif bg-red-600 rounded-sm shadow text-white py-1
                        px-2">
                        -{{ $product->finalDiscount }} %
                    </div>
                @endisset
            </a>
            <ul class="w-full">
                <li class="text-sm text-gray-500">
                    @foreach ($product->ingredients as $ingredient)
                        {{ $ingredient->name }},
                    @endforeach
                </li>
            </ul>
        </div>
        <div class="text-sm self-center px-4 md:px-8">
            <input id="pq{{ $product->id }}" type="number" value="1" min="1" name="quantity"
                class="w-full rounded-sm bg-white text-center" @if ($product->quantity == 0) disabled @endif>
        </div>

        @isset($product->finalDiscount)
            <div class="self-center justify-self-center">
                <div class="text-sm text-gray-300">
                    {{ $product->price }} Ron
                </div>
                <div class="text-xs text-gray-300 line-through">
                    {{ $product->priceWithoutDiscount }} Ron
                </div>
            </div>
        @else
            <div class="text-sm text-gray-300 self-center justify-self-center">
                {{ $product->price }} Ron
            </div>
        @endisset

        @if ($product->quantity > 0)
            <button
                class="self-center py-1 px-2 text-sm rounded border border-gray-400 text-gray-400 hover:text-gray-200 hover:border-gray-200 product-add-to-cart">
                Adauga in cos
            </button>
        @else
            <div class="text-center self-center py-1 px-2 text-sm rounded border border-red-600 text-red-600 ">
                Nu este in stock
            </div>
        @endif
    </form>
</li>
