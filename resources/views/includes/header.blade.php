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
            <div id="auth" href="" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                Autentificare
            </div>
            <span class="text-red-700 px-1">
                /
            </span>
            <div id="register" class="cursor-pointer text-gray-500 hover:text-gray-100 px-1">
                Inregistrare
            </div>
        </div>


        <div id="loginModal"
            class="fixed top-1/2 left-0 transform -translate-y-1/2 w-full md:left-1/2 md:-translate-x-1/2 md:w-3/4 lg:w-1/2 2xl:w-1/4 flex-col items-center justify-center z-30 bg-white md:rounded"
            style="display: none">

            <button id="closeAuthModal" class="absolute top-0 right-0 cursor-pointer p-2">
                <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                    width="24px">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
            </button>

            <form id="loginForm" method="POST" action="{{ route('login') }}" class="p-6 md:flex-1">
                @csrf

                <!-- Email Address -->
                <div>
                    <x-label for=" email" :value="__('Email')" />

                    <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                        autofocus />

                    <!-- Password -->
                    <div class="mt-4">
                        <x-label for="password" :value="__('Password')" />

                        <x-input id="password" class="block mt-1 w-full" type="password" name="password" required
                            autocomplete="current-password" />
                    </div>
                </div>

                <!-- Remember Me -->
                <div class="block mt-4">
                    <label for="remember_me" class="inline-flex items-center">
                        <input id="remember_me" type="checkbox"
                            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            name="remember">
                        <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                    </label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    <div class="flex flex-col">
                        @if (Route::has('password.request'))
                            <a class="underline text-sm text-gray-600 hover:text-gray-900"
                                href="{{ route('password.request') }}">
                                {{ __('Forgot your password?') }}
                            </a>
                        @endif
                    </div>

                    <x-button class="ml-3">
                        {{ __('Log in') }}
                    </x-button>
                </div>
            </form>
        </div>

        <div id="registerModal"
            class="fixed top-1/2 left-0 transform -translate-y-1/2 w-full h-full md:left-1/2 md:-translate-x-1/2 md:w-3/4  md:h-auto lg:w-1/2 2xl:w-1/4 flex-col items-center justify-center z-30 bg-white md:rounded"
            style="display: none">

            <button id="closeRegisterModal" class="absolute top-0 right-0 cursor-pointer p-2">
                <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"
                    width="24px">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
            </button>

            <form id="registerForm" method="POST" action="{{ route('register') }}" class="bg-white p-6 md:flex-1 md:rounded">
                @csrf

                <div>
                    <x-label for="firstName" :value="__('First name')" />

                    <x-input id="firstName" class="block mt-1 w-full" type="text" name="first_name"
                        :value="old('first_name')" required autofocus />
                </div>

                <div class="mt-4">
                    <x-label for="lastName" :value="__('Last name')" />

                    <x-input id="lastName" class="block mt-1 w-full" type="text" name="last_name" :value="old('last_name')" required
                        autofocus />
                </div>

                <div class="mt-4">
                    <x-label for="phoneNumber" :value="__('Phone number')" />

                    <x-input id="phoneNumber" class="block mt-1 w-full" type="text" name="phone_number"
                        :value="old('phone_number')" required autofocus />
                </div>


                <div class="mt-4">
                    <x-label for="email" :value="__('Email')" />

                    <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')"
                        required />
                </div>


                <div class="mt-4">
                    <x-label for="password" :value="__('Password')" />

                    <x-input id="password" class="block mt-1 w-full" type="password" name="password" required
                        autocomplete="new-password" />
                </div>


                <div class="mt-4">
                    <x-label for="password_confirmation" :value="__('Confirm Password')" />

                    <x-input id="password_confirmation" class="block mt-1 w-full" type="password"
                        name="password_confirmation" required />
                </div>

                <div class="flex items-center justify-end mt-4">
                    <x-button class="ml-4">
                        {{ __('Register') }}
                    </x-button>
                </div>
            </form>
        </div>
    @endguest

    @auth
        <ul class="w-full flex items-center justify-end gap-x-2 px-2 py-2 text-sm">
            <li>
                <a href="{{ route('account.index') }}"
                    class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                    Account
                </a>
            </li>
            <li>
                <a href="/" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                    Orders
                </a>
            </li>
            <li>
                <a href="/" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                    Reservations
                </a>
            </li>
            <li>
                <a href="{{ route('address.index') }}"
                    class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                    Addresses
                </a>
            </li>
            <li class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                <form method="post" action="{{ route('logout') }}">
                    @csrf
                    <button>
                        Logout
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

    @guest
        <script>
            $('#auth').click(function() {
                $('#backdrop').fadeIn();
                $('#loginModal').fadeIn();
            })


            $('#register').click(function() {
                $('#backdrop').fadeIn();
                $('#registerModal').fadeIn();
            })

            $('#closeAuthModal').click(function() {
                $('#backdrop').fadeOut();
                $('#loginModal').fadeOut();
            })

            $('#closeRegisterModal').click(function() {
                $('#backdrop').fadeOut();
                $('#registerModal').fadeOut();
            })
        </script>
    @endguest


@endpush
