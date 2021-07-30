@props(['product'])

<li class="mb-4 last:mb-0">
	<form method="POST" action="{{ route('carts.store', ['productId' => $product->id]) }}"
		class="mb-4 w-full grid grid-cols-4 gap-y-3 md:grid-cols-12">
		@csrf

		<div class="col-span-4 flex flex-col items-start md:col-span-4">
			<a class="relative block"
				href="{{ route('products.show', ['categorySlug' => $product->category->slug, 'subCategorySlug' => $product->subCategory->slug, 'productSlug' => $product->slug]) }}">
				<h2 class="text-gray-300 justify-self-start self-center hover:text-gray-200 hover:underline">
					{{ $product->name }} -
					{{ $product->weight }}{{ $product->unit->name }}
				</h2>

				@isset($product->finalDiscount)
				<div
					class="absolute text-xs -top-2 @if ($product->finalDiscount >= 10) -right-16 @else -right-14 @endif bg-red-600 rounded-sm shadow text-white py-1 px-2">
					-{{ $product->finalDiscount }} %
				</div>
				@endisset

			</a>
			@isset($product->ingredients)
			<ul class="w-full">
				<li class="text-sm text-gray-500">
					@foreach ($product->ingredients as $ingredient)
					{{ $ingredient->name }},
					@endforeach
				</li>
			</ul>
			@endisset
		</div>

		<div class="col-span-4 self-center justify-self-stretch flex items-center justify-between md:col-span-4">
			@if ($product->quantity > 0)
			<div class="flex-initial w-1/2 text-sm self-center">
				<input type="number" value="1" min="1" name="quantity" class="w-full rounded-sm bg-white text-center"
					@if($product->quantity == 0) disabled @endif>
			</div>
			@endif
			<div class="flex-1 w-full text-center md:w-1/2">
				@isset($product->finalDiscount)
				<div class="flex-1 text-sm text-gray-300">
					{{ $product->price }} Ron
				</div>
				<div class="text-xs text-gray-300 line-through">
					{{ $product->priceWithoutDiscount }} Ron
				</div>
				@else
				<div class="text-sm text-gray-300">
					{{ $product->price }} Ron
				</div>
				@endisset
			</div>
		</div>

		<div class="w-3/4 col-span-4 self-center justify-self-center md:col-span-4">
			@if ($product->quantity > 0)
			<button
				class="w-full text-center py-1 px-2 text-sm rounded border border-gray-400 text-gray-400 hover:text-gray-200 hover:border-gray-200">
				Adauga in cos
			</button>
			@else
			<div class="w-full text-center py-1 px-2 text-sm rounded border border-red-600 text-red-600 ">
				Nu este in stock
			</div>
			@endif
		</div>

	</form>
</li>