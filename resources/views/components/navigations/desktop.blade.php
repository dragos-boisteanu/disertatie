@props(['cart'])

<nav class=" bg-orange-600 py-2 px-4 hidden lg:flex lg:items-center lg:justify-between">
	<div class="w-8 px-1"></div>
	<ul class=" w-full flex items-start justify-center px-4 gap-x-20">
		<li>
			<a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black  {{ request()->is('menu/*') ? '!border-black !text-black ' : '' }}"
				href="{{ route('menu.index') }}">
				Acasa
			</a>
		</li>
		<li>
			<a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black  {{ request()->is('menu/*') ? '!border-black !text-black ' : '' }}"
				href="{{ route('menu.index') }}">
				Meniu
			</a>
		</li>
		<li class="relative w-40">
			<a class="block h-40 w-40 absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 "
				href="{{ route('home') }}">
				<img class="w-full h-full rounded-full shadow-md" src="{{ asset('/storage/logo.png')}}" />
			</a>
		</li>

		<li>
			<a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black {{ request()->is('about') ? '!border-black !text-black ' : '' }}"
				href="/">
				Despre
			</a>
		</li>
		<li>
			<a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black {{ request()->is('contanct') ? '!border-black !text-black ' : '' }}"
				href="/">
				Contanct
			</a>
		</li>
	</ul>

	<x-desktop-cart :cart="$cart"></x-desktop-cart>
</nav>