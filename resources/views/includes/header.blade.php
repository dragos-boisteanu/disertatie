<header class="flex-initial h-auto bg-gray-800">
    <div id="backdrop" class="fixed z-20 top-0 left-0 h-full w-full bg-black bg-opacity-75 hidden"></div>
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
    <nav class="h-10 bg-orange-600 flex items-center justify-between px-4 lg:hidden">
        <div id="mobileMenuToggler" class="p-3 cursor-pointer">
            @for ($i = 0; $i < 3; $i++)
                <div class="bg-black h-0.5 w-6 my-1.5"></div>
            @endfor
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
        </div>
        <ul id="mobileSlider" class="fixed z-40 top-0 left-0 h-full w-3/4 bg-gray-900 text-white hidden">
            <li>
                <a href="">
                    Meniu
                </a>
            </li>
            <li>
                <a href="">
                    Contanct
                </a>
            </li>
            @auth
                <li>
                    <a href="/">
                        Account
                    </a>
                </li>
                <li>
                    <a href="/">
                        Comenzi
                    </a>
                </li>
                <li>
                    <a href="/">
                        Rezervari
                    </a>
                </li>
                <li>
                    <a href="/">
                        Adrese
                    </a>
                </li>
                <li>
                    <form method="post" action="{{ route('logout') }}">
                        @csrf
                        <button>
                            Logout
                        </button>
                    </form>
                </li>
            @endauth
        </ul>
    </nav>
    
    {{-- desktop nav --}}
    <nav class=" h-10 bg-orange-600 px-4 hidden lg:flex lg:items-center lg:justify-between">
        <div>
        </div>
        <div class=" flex items-center justify-between gap-x-10">
            <ul class="flex items-start">
                <li>
                    <a class="text-white text-lg pb-0.5 border-b-2 border-orange-600 hover:border-black hover:text-black"
                        href="/">
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

        {{-- cart --}}
        <x-cart></x-cart>
    </nav>

    @guest
        <div class="w-full flex items-center justify-end px-2 py-2 text-sm">
            <div id="loginCaller" href="" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
                Autentificare
            </div>
            <span class="text-red-700 px-1">
                /
            </span>
            <div id="registerCaller" class="cursor-pointer text-gray-500 hover:text-gray-100 px-1">
                Inregistrare
            </div>
        </div>
        <div id="authModal" class="fixed top-1/2 left-0 transform -translate-y-1/2 w-full md:left-1/2 md:-translate-x-1/2 md:w-3/4 lg:w-1/2 2xl:w-1/3 flex-col items-center justify-center z-30 hidden">
            <div
                class="relative w-full md:rounded-md shadow-md flex flex-col items-stretch justify-start md:flex-row md:justify-between overflow-auto">
                <button id="closeAuthModal" class="absolute top-0 right-0 cursor-pointer p-2">
                    <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" height="24px"
                        viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                </button>
                {{-- <div class="bg-trueGray-800 text-white p-4 md:rounded-l-md">
                    <div class="font-semibold text-lg">
                        Advantajes of being a member
                    </div>
                    <ul class="list-disc ml-6 font-medium text-sm md:text-base">
                        <li class="my-1">
                            Order history
                        </li>
                        <li class="my-1">
                            Repeat order
                        </li>
                        <li class="my-1">
                            Track order
                        </li>
                        <li class="my-1">
                            Save addresses
                        </li>
                    </ul>
                </div> --}}
                <form id="loginForm" method="POST" action="{{ route('login') }}"
                    class="bg-white p-6 md:flex-1 md:rounded-r-md hidden">
                    @csrf

                    <!-- Email Address -->
                    <div>
                        <x-label for="email" :value="__('Email')" />

                        <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')"
                            required autofocus />
                    </div>

                    <!-- Password -->
                    <div class="mt-4">
                        <x-label for="password" :value="__('Password')" />

                        <x-input id="password" class="block mt-1 w-full" type="password" name="password" required
                            autocomplete="current-password" />
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

                <form id="registerForm" method="POST" action="{{ route('register') }}"
                    class="bg-white p-6 md:flex-1 md:rounded-r-md hidden">
                    @csrf

                    {{-- First name --}}
                    <div>
                        <x-label for="firstName" :value="__('First name')" />

                        <x-input id="firstName" class="block mt-1 w-full" type="text" name="first_name"
                            :value="old('first_name')" required autofocus />
                    </div>

                    <!-- Name -->
                    <div class="mt-4">
                        <x-label for="name" :value="__('Name')" />

                        <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required
                            autofocus />
                    </div>

                    {{-- Phone Number --}}
                    <div class="mt-4">
                        <x-label for="phoneNumber" :value="__('Phone number')" />

                        <x-input id="phoneNumber" class="block mt-1 w-full" type="text" name="phone_number"
                            :value="old('phone_number')" required autofocus />
                    </div>

                    <!-- Email Address -->
                    <div class="mt-4">
                        <x-label for="email" :value="__('Email')" />

                        <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')"
                            required />
                    </div>

                    <!-- Password -->
                    <div class="mt-4">
                        <x-label for="password" :value="__('Password')" />

                        <x-input id="password" class="block mt-1 w-full" type="password" name="password" required
                            autocomplete="new-password" />
                    </div>

                    <!-- Confirm Password -->
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
        </div>
    @endguest

    @auth
        <ul>
            <li>
                <a href="/">
                    Account
                </a>
            </li>
            <li>
                <a href="/">
                    Orders
                </a>
            </li>
            <li>
                <a href="/">
                    Reservations
                </a>
            </li>
            <li>
                <a href="/">
                    Addresses
                </a>
            </li>
            <li class="bg-orange-600 py-4 text-center">
                <form method="post" action="{{ route('logout') }}">
                    @csrf
                    <button>
                        Logout
                    </button>
                </form>
            </li>
        </ul>
    @endauth
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
        const mobileMenuToggler = document.getElementById("mobileMenuToggler");
        const mobileSlider = document.getElementById("mobileSlider");

        mobileMenuToggler.addEventListener("click", function() {
            toggleMenu();
        })

        function toggleMenu() {
            if (backdrop.classList.contains('hidden') && mobileSlider.classList.contains('hidden')) {
                backdrop.classList.remove('hidden');
                mobileSlider.classList.remove('hidden')
            } else {
                backdrop.classList.add('hidden');
                mobileSlider.classList.add('hidden');
            }
        }
    </script>

    @guest
        <script>
            const authModal = document.getElementById('authModal');

            const closeAuthModal = document.getElementById('closeAuthModal');
            const loginCaller = document.getElementById('loginCaller');
            const registerCaller = document.getElementById('registerCaller');

            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm')

            loginCaller.addEventListener('click', function() {
                if (backdrop.classList.contains('hidden') && authModal.classList.contains('hidden')) {
                    backdrop.classList.remove('hidden');
                    authModal.classList.remove('hidden');
                    authModal.classList.add('flex');
                    loginForm.classList.remove('hidden');

                    if (!registerForm.classList.contains('hidden')) {
                        registerForm.classList.add('hidden');
                    }
                }
            })

            registerCaller.addEventListener('click', function() {
                if (backdrop.classList.contains('hidden') && authModal.classList.contains('hidden')) {
                    backdrop.classList.remove('hidden');
                    authModal.classList.remove('hidden');
                    authModal.classList.add('flex');
                    if (!loginForm.classList.contains('hidden')) {
                        loginForm.classList.add('hidden');
                    }
                    registerForm.classList.remove('hidden')
                }
            })


            closeAuthModal.addEventListener('click', function() {
                if (!backdrop.classList.contains('hidden') && !authModal.classList.contains('hidden')) {
                    backdrop.classList.add('hidden');
                    authModal.classList.add('hidden');
                    authModal.classList.remove('flex');
                }
            })
        </script>
    @endguest

@endpush
