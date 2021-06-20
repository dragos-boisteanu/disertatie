<header class="flex-initial h-80 bg-gray-900">
    <div class="splide">
        <div class="splide__track">
            <ul class="splide__list">
                <li class="splide__slide"><img src="{{ asset('storage/images/pizza-2.jpg') }}" alt="pizza"></li>
                <li class="splide__slide">Slide 02</li>
                <li class="splide__slide">Slide 03</li>
            </ul>
        </div>
    </div>
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
        <ul id="mobileSlider" class="fixed top-0 left-0 h-full w-3/4 bg-gray-900 text-white hidden">
            <li>
                <a href="">
                    Acasa
                </a>
            </li>
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
        </ul>
    </nav>
    <nav class=" h-10 bg-orange-600 px-4 hidden lg:flex lg:items-center lg:justify-between">
        <div>
        </div>
        <div class=" flex items-center justify-between gap-x-10">
            <ul class="flex items-start">
                <li>
                    <a class="text-white text-lg pb-0.5 border-b-4 border-orange-600 hover:border-black hover:text-black"
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

        <a class="relative rounded bg-trueGray-800 p-2 shadow-md" href="/">
            <div class="absolute -top-1 -right-3 bg-white text-orange-700 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                2
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
        </a>
    </nav>

    @guest
        <div class="w-full flex items-center justify-end px-2 py-2 text-sm">
            <div id="loginCaller" href="" class="cursor-pointer outline-none text-gray-600 hover:text-gray-100 px-1">
                Autentificare
            </div>
            <span class="text-red-700 px-1">
                /
            </span>
            <div id="registerCaller" class="cursor-pointer text-gray-600 hover:text-gray-100 px-1">
                Inregistrare
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
    <script>
        new Splide('.splide', {
            type: 'loop',
            speed: 400,
            height: '240px',
            widht: 'full',
            rewind: true,
            arrows: false,
            pagination: false,
            autoplay: true
        }).mount();
    </script>

    <script>
        const mobileMenuToggler = document.getElementById("mobileMenuToggler");
        const backdrop = document.getElementById("backdrop");
        const mobileSlider = document.getElementById("mobileSlider");

        backdrop.addEventListener("click", function() {
            if (!backdrop.classList.contains('hidden') && !backdrop.classList.contains('hidden')) {
                backdrop.classList.add('hidden');
                mobileSlider.classList.add('hidden');
            }
        })
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

    <script>
        const loginCaller = document.getElementById('loginCaller');
        const registerCaller = document.getElementById('registerCaller');
    </script>
@endpush
