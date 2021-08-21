<div id="mobileSlider" class="fixed z-20 left-0 top-0 w-3/4 h-screen bg-trueGray-900 shadow-md flex flex-col md:w-2/5"
	style="display: none">

	<div class="flex-initial w-full flex items-center justify-center border-b border-trueGray-400 py-4">
		<div class="w-32 h-32">
			<img class="h-full w-full rounded-full" src='{{ asset("/storage/logo.png") }}' />
		</div>
	</div>

	@guest
	<div class="flex-1 flex items-end justify-start">
		<div
			class="w-full border-b border-trueGray-400 p-4 flex items-center justify-center gap-x-4 cursor-pointer outline-none text-gray-500 px-1">
			<div class="cursor-pointer outline-none hover:text-gray-100 px-1" data-auth>
				Autentificare
			</div>
			<span class="text-red-700 px-1">
				/
			</span>
			<div class="cursor-pointer hover:text-gray-100 px-1" data-register>
				Inregistrare
			</div>
		</div>
	</div>
	@endguest

	<ul class="flex-initial mt-4 w-full @guest h-full @endguest text-sm">
		<li>
			<a class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('/') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}"
				href="{{ route('home') }}">
				Acasa
			</a>
		</li>
		<li>
			<a class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('/') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}"
				href="{{ route('menu.index') }}">
				Meniu
			</a>
		</li>
		<li>
			<a class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('contact') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}"
				href="{{ route('contact') }}">
				Contanct
			</a>
		</li>
		<li>
			<a class="block py-2 px-4 border-transparent border-l-4 cursor-pointer outline-none text-gray-500 hover:text-gray-100 {{ request()->is('about') ? '!text-gray-100 border-white bg-trueGray-100 bg-opacity-10' : '' }}"
				href="/">
				Despre noi
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

</div>