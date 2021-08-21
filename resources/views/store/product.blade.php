@extends('layouts.store')

@section('content')
{{ Breadcrumbs::render('product', $product->category, $product) }}
<div>
	<div class="md:flex md:justify-between md:items-center md:gap-x-10">
		<div class="relative w-full h-[170px] px-8 py-2 md:w-[300px] md:px-0 md:h-[234px] lg:w-[350px]">
			<img src="{{ asset("$product->image")}}" class="w-full h-full rounded shadow-sm object-cover" />
			@isset($product->finalDiscount)
			<div class="absolute top-5 right-5 text-xs bg-red-600 rounded-sm shadow text-white py-1 px-2">
				-{{ $product->finalDiscount }} %
			</div>
			@endisset
		</div>

		<div class="h-full flex-1 md:flex md:flex-col md:items-start md:justify-center md:gap-y-2">
			<h1 class="text-3xl mb-4 font-semibold text-trueGray-300">{{ $product->name }} {{ $product->weight }}
				{{ $product->unit->name }}</h1>
			<div class="my-2 flex items-center justify-between md:flex-col md:items-start md:gap-y-2">
				@if ($product->quantity > 0)
				<div class="text-sm text-green-600">In stoc</div>
				@else
				<div class="text-red-600">Nu este in stoc</div>
				@endif

				@isset($product->finalDiscount)
				<div>
					<div class="text-lg text-gray-300">{{ $product->price }} Ron</div>
					<div class="text-xs text-gray-300 line-through">{{ $product->priceWithoutDiscount }} Ron</div>
				</div>

				@else
				<div class="text-lg text-gray-300">{{ $product->price }} Ron</div>
				@endisset
			</div>

			<form id="addToCartForm" method="post" action="{{ route('carts.store', ['productId' => $product->id]) }}"
				class="mt-4 mb-4 w-full flex items-center gap-6 md:flex-col md:items-start md:w-auto">
				@csrf

				@if ($product->quantity > 0)
				<div class="flex items-start gap-2 md:flex-col md:w-full">
					<label for="pq{{$product->id}}" class="text-sm text-gray-300">Cantitiate</label>
					<input id="pq{{ $product->id }}" type="number" value="1" min="1" name="quantity"
						class="w-1/2 flex-1rounded-sm bg-white text-center rounded-sm">
				</div>

				@endif

				<div class="w-full flex-auto">
					@if ($product->quantity > 0)
					<button
						class="w-full self-center py-1 px-2 text-sm rounded border border-gray-400 text-gray-400 hover:text-gray-200 hover:border-gray-200 product-add-to-cart">
						Adauga in cos
					</button>

					@endif
				</div>

			</form>
		</div>
	</div>

	<div class="w-full flex items-center my-4 md:w-1/2">
		<div id="descriptionSelect"
			class="flex-1 text-gray-100 pb-1 border-b border-gray-100 text-center hover:cursor-pointer hover:text-gray-100">
			Descriere
		</div>
		@if ($product->has_ingredients)
		<div id="ingredientsSelect"
			class="flex-1 text-gray-400 pb-1 border-b border-transparent text-center hover:cursor-pointer hover:text-gray-100">
			Ingrediente
		</div>
		@endif
	</div>

	<div id="description" class="w-full text-sm px-4 text-gray-400">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt et ligula non auctor. Mauris eget justo
		ut sapien pulvinar ullamcorper quis vulputate libero. Quisque at arcu convallis, sollicitudin nulla ut,
		malesuada justo. Nullam vehicula fermentum tellus a mollis. Nulla venenatis pellentesque erat, nec vulputate ex
		viverra sit amet. Proin sodales nunc vel tortor consequat tincidunt. Sed a sem rutrum, tempor elit at, laoreet
		lectus. Aenean luctus dictum dapibus. Vestibulum consectetur congue dolor a sollicitudin. Nulla porta nunc
		lectus, ac tincidunt ipsum auctor sit amet. Nam ex lectus, ullamcorper vel dui sit amet, dictum vehicula purus.
		Etiam condimentum risus faucibus ante consequat placerat. Proin tincidunt quam in viverra egestas. Maecenas
		vitae lacinia mauris. Nulla facilisi. Phasellus mollis arcu et lacus volutpat, quis efficitur odio ultrices.
	</div>

	@if ($product->has_ingredients)
	<ul id="ingredients" class="w-full text-sm px-4 text-gray-400 list-disc" style="display: none">
		@foreach ($product->ingredients as $ingredient)
		<li>
			{{ $ingredient->pivot->quantity }}{{ $ingredient->unit->name }} {{ $ingredient->name }}
		</li>
		@endforeach

	</ul>
	@endif

</div>
@endsection

@push('scripts')
<script>
	const descriptionSelect = $('#descriptionSelect');
	const ingredientsSelect = $('#ingredientsSelect');

	const description = $('#description');
	const ingredients = $('#ingredients');

	ingredientsSelect.click(function() {
		descriptionSelect.removeClass('text-gray-100');
		descriptionSelect.addClass('text-gray-400 border-transparent')

		ingredientsSelect.addClass('text-gray-100');
		ingredientsSelect.removeClass('text-gray-400 border-transparent');

		description.hide();
		ingredients.show();
	})

	descriptionSelect.click(function() {
		ingredientsSelect.removeClass('text-gray-100');
		ingredientsSelect.addClass('text-gray-400 border-transparent')

		descriptionSelect.addClass('text-gray-100');
		descriptionSelect.removeClass('text-gray-400 border-transparent');

		ingredients.hide();
		description.show();
	})
</script>
@endpush