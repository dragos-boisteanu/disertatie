@props(['cart'])

<nav class="relative bg-orange-600 flex items-center justify-between px-4 py-1 lg:hidden">

	<div id="mobileMenuBtn" class="cursor-pointer">
		@for ($i = 0; $i < 3; $i++) <div class="bg-black w-6 h-0.5 my-1.5">
	</div>
	@endfor
	</div>

	<a class="block absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-32" href="{{ route('home') }}">
		<img class="h-full w-full rounded-full shadow-sm" src='{{ asset("/storage/logo.png") }}' />
	</a>

	<x-mobile-cart-button :cart="$cart"></x-mobile-cart-button>
</nav>