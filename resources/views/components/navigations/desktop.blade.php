@props(['cart'])

<nav class=" bg-orange-600 py-2 px-4 hidden lg:flex lg:items-center lg:justify-between">
	<ul class="w-full flex items-start justify-end px-4 gap-x-4">
		<li>
			<a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black  {{ request()->is('menu/*') ? '!border-black !text-black ' : '' }}"
				href="{{ route('menu.index') }}">
				Meniu
			</a>
		</li>
		<li>
			<a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black {{ request()->is('about') ? '!border-black !text-black ' : '' }}"
				href="/">
				About
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