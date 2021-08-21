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