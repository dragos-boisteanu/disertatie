<header class="flex-none bg-gray-900">
    {{-- <div class="splide">
        <div class="splide__track">
            <ul class="splide__list">
                <li class="splide__slide"><img class="object-cover" src="{{ asset('storage/images/slider1.jpg') }}" alt="pizza"></li>
                <li class="splide__slide"><img class="object-cover" src="{{ asset('storage/images/hot-dishes-2.jpg')}}"></li>
                <li class="splide__slide"><img class="object-cover" src="{{ asset('storage/images/wine.jpg') }}"></li>
            </ul>
        </div>
    </div> --}}

    {{-- mobile nav --}}
    <nav class="bg-orange-600 flex items-center justify-between px-4 lg:hidden">
        <ul class="flex items-center gap-x-4 py-4">
            <li>
                <a class="text-white text-sm px-2 py-1 rounded bg-trueGray-800 bg-opacity-90" href="/">
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
    <nav class=" h-10 bg-orange-600 px-4 hidden lg:flex lg:items-center lg:justify-between">
        <div>
        </div>
        <div class=" flex items-center justify-between gap-x-10">
            <ul class="flex items-start">
                <li>
                    <a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black"
                        href="{{ route('menu.index') }}">
                        Meniu
                    </a>
                </li>
            </ul>
            <div class="relative w-40">
                <div class="absolute -top-20 left-0 z-10 rounded-full w-40 h-40">
                    <img class="rounded-full w-full h-full" src="{{ asset('storage/logo/logo.png') }}">
                </div>
            </div>
            <ul class="flex items-start">
                <li>
                    <a class="text-white text-lg pb-0.5 border-b-4 border-orange-600 hover:border-black hover:text-black"
                        href="/">
                        Contanct
                    </a>
                </li>
            </ul>
        </div>
        {{-- desktop cart --}}
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
                    class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ (request()->is('account'))  ? '!text-gray-100' : '' }}">
                    Cont
                </a>
            </li>
            <li>
                <a href="{{ route('order.index') }}" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ (request()->is('account/orders*')) ? '!text-gray-100' : '' }}">
                    Comenzi
                </a>
            </li>
            <li>
                <a href="/" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ (request()->is('reservations*')) ? '!text-gray-100' : '' }}">
                    Reservari
                </a>
            </li>
            <li>
                <a href="{{ route('address.index') }}"
                    class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1 {{ (request()->is('addresses*')) ? '!text-gray-100' : '' }}">
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
