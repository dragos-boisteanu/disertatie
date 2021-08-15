<header id="top" class="flex-none bg-gray-900">

	<div id="backdrop" class="fixed top-0 left-0 z-10 bg-black bg-opacity-75 w-full h-screen" style="display: none"></div>

	<div class="w-full h-52">
		<img class="h-full w-full object-cover" src='{{ asset("/storage/header3.jpg")}}' />
	</div>

	{{-- mobile nav --}}
	<nav class="relative bg-orange-600 flex items-center justify-between px-4 py-1 lg:hidden">

		<div id="mobileMenuBtn" class="cursor-pointer">
			@for ($i = 0; $i < 3; $i++) <div class="bg-black w-6 h-0.5 my-1.5">
		</div>
		@endfor
		</div>

		<div class="absolute z-10 bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-32">
			<img class="h-full w-full rounded-full" src='{{ asset("/storage/logo.png") }}' />
		</div>

		<x-mobile-cart-button :cart="$cart"></x-mobile-cart-button>
	</nav>

	{{-- desktop nav --}}
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

	{{-- mobile menu slider --}}
	<div id="mobileSlider" class="fixed z-20 left-0 top-0 w-3/4 h-screen bg-trueGray-900 shadow-md flex flex-col"
		style="display: none">

		<div class="flex-initial w-full flex items-center justify-center border-b border-trueGray-400 py-4">
			<div class="w-32 h-32">
				<img class="h-full w-full rounded-full" src='{{ asset("/storage/logo.png") }}' />
			</div>
		</div>

		<ul class="flex-initial mt-4 w-full text-sm">
			<li>
				<a class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('/') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}"
					href="/">
					Meniu
				</a>
			</li>
			<li>
				<a class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('contact') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}"
					href="/">
					Contanct
				</a>
			</li>
			<li>
				<a class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('about') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}"
					href="/">
					About us
				</a>
			</li>
		</ul>
		@auth
		<ul class="flex-initial mt-4 w-full text-sm">
			<li>
				<a href="{{ route('account.index') }}"
					class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('account') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}">
					Cont
				</a>
			</li>
			<li>
				<a href="{{ route('orders.index') }}"
					class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('account/orders*') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}">
					Comenzi
				</a>
			</li>
			<li>
				<a href="{{ route('reservations.index') }}"
					class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('account/reservations*') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}">
					Reservari
				</a>
			</li>
			<li>
				<a href="{{ route('address.index') }}"
					class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('addresses*') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}">
					Adrese
				</a>
			</li>
		</ul>
		<div class="flex-1 h-full flex items-end justify-start">
			<form method="post" action="{{ route('logout') }}" class="w-full border-t border-trueGray-400 p-4">
				@csrf
				<button
					class="group w-full flex items-center justify-center gap-x-4 cursor-pointer outline-none text-gray-500 px-1">
					<svg class="text-red-600 group-hover:text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg"
						enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px">
						<g>
							<path d="M0,0h24v24H0V0z" fill="none" />
						</g>
						<g>
							<path
								d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
						</g>
					</svg>
					<span class="group-hover:text-gray-100">Delogare</span>
				</button>
			</form>
		</div>
		@endauth
		@guest
		<div class="flex-1 h-full flex items-end justify-start">
			<div
				class="w-full border-t border-trueGray-400 p-4 flex items-center justify-center gap-x-4 cursor-pointer outline-none text-gray-500 px-1">
				<div id="auth" class="cursor-pointer outline-none hover:text-gray-100 px-1">
					Autentificare
				</div>
				<span class="text-red-700 px-1">
					/
				</span>
				<div id="register" class="cursor-pointer hover:text-gray-100 px-1">
					Inregistrare
				</div>
			</div>

			@include('includes.auth.login')
			@include('includes.auth.register')
		</div>
		@endguest
	</div>

	<div class="h-9 mb-2 lg:mb-0 @auth lg:hidden @endauth"></div>

	@auth
	{{-- desktop menu --}}
	<ul class="hidden w-full items-center justify-end gap-x-2 px-2 py-2 text-sm lg:flex">
		<li>
			<a href="{{ route('account.index') }}"
				class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ request()->is('account') ? '!text-gray-100' : '' }}">
				Cont
			</a>
		</li>
		<li>
			<a href="{{ route('orders.index') }}"
				class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ request()->is('account/orders*') ? '!text-gray-100' : '' }}">
				Comenzi
			</a>
		</li>
		<li>
			<a href="{{ route('reservations.index') }}"
				class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ request()->is('account/reservations*') ? '!text-gray-100' : '' }}">
				Reservari
			</a>
		</li>
		<li>
			<a href="{{ route('address.index') }}"
				class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ request()->is('addresses*') ? '!text-gray-100' : '' }}">
				Adrese
			</a>
		</li>
		<li class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
			<form method="post" action="{{ route('logout') }}">
				@csrf
				<button>
					Delogare
				</button>
			</form>
		</li>
	</ul>
	@endauth

	<x-mobile-cart :cart="$cart"></x-mobile-cart>
</header>

@push('scripts')
{{-- <script>
        new Splide('.splide', {
            type: 'loop',
            speed: 400,
            height: '250px',
            widht: 'full',
            rewind: true,
            arrows: false,
            pagination: false,
            autoplay: true
        }).mount();
    </script> --}}

<script>
	const mobileSlider = $('#mobileSlider');
	const backdrop = $('#backdrop');

	$('#auth').click(function() {
		backdrop.hide();
		mobileSlider.hide();
		loginForm.modal({
			fadeDuration: 150,
			fadeDelay: 0.50
		});
	})

	$('#register').click(function() {
		backdrop.hide();
		mobileSlider.hide();
		registerForm.modal({
			fadeDuration: 150,
			fadeDelay: 0.50
			});
	})

	backdrop.click(function() {
		mobileSlider.hide();
		backdrop.hide();
	})


	$('#mobileMenuBtn').click(function() {
		backdrop.show();
		mobileSlider.show();
	});
</script>


@endpush