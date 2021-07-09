<header class="flex-none bg-gray-900">
    {{-- mobile nav --}}
    <nav class="bg-orange-600 flex items-center justify-between px-4 lg:hidden">
        <ul class="flex items-center gap-x-4 py-4">
            <li>
                <a class="text-white text-sm px-2 py-1 rounded bg-trueGray-800 bg-opacity-9" href="/">
                    Meniu
                </a>

            </li>
            <li>
                <a class="text-white text-sm px-2 py-1 rounded bg-trueGray-800 bg-opacity-90" href="/">
                    Contanct
                </a>
            </li>
            <li>
                <a class="text-white text-sm px-2 py-1 rounded bg-trueGray-800 bg-opacity-90" href="/">
                    About us
                </a>
            </li>
        </ul>
        <x-mobile-cart-button></x-mobile-cart-button>
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
        <x-desktop-cart></x-desktop-cart>
    </nav>

    @guest
        <div class="w-full flex items-center justify-end px-2 py-2 text-sm">
            <div id="auth" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                Autentificare
            </div>
            <span class="text-red-700 px-1">
                /
            </span>
            <div id="register" class="cursor-pointer text-gray-500 hover:text-gray-100 px-1">
                Inregistrare
            </div>
        </div>

        @include('includes.auth.login')
        @include('includes.auth.register')

    @endguest


    @auth
        <ul class="w-full flex items-center justify-end gap-x-2 px-2 py-2 text-sm">
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
                <a href="/"
                    class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ request()->is('reservations*') ? '!text-gray-100' : '' }}">
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

    <x-mobile-cart></x-mobile-cart>
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



@endpush
