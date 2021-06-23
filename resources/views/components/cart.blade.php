{{-- <a class="relative rounded bg-trueGray-800 p-2 shadow-md" href="/">
  <div
      id="cartQuantity"
      class="absolute -top-1 -right-3 bg-white text-orange-700 px-1.5 py-0.5 rounded-full text-xs font-semibold">
      {{ $cartItemsCount }}
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
          d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
</a> --}}
<div class="relative group rounded bg-trueGray-800 shadow-sm group-hover:rounded-b-none">
    <a class="relative block h-full w-full p-2" href="/">
        <div id="cartQuantity"
            class="absolute -top-1 -right-3 bg-white text-orange-700 px-1.5 py-0.5 rounded-full text-xs font-semibold">
            {{ $cartItemsCount }}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
                d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
    </a>
    <div class="min-w-56 absolute min-w-[300px] right-0 bg-white rounded-sm p-2 hidden group-hover:block">
        <h4 class="text-lg font-semibold border-b border-gray-800 pb-1 mb-1">Cart</h4>
        <ul class="w-full">
            @foreach ($cartItems as $item)
                <li class="grid grid-cols-3 border-b my-1 py-1 last:border-0">
                    <div class="col-span-2">
                        <div class="text-sm font-semibold">
                            {{ $item->name }}
                        </div>
                        <div class="text-xs">
                            x{{ $item->pivot->quantity }}
                        </div>
                    </div>
                    <div class="text-sm self-center justify-self-center">
                        {{ $item->price }} Ron
                    </div>
                </li>
            @endforeach
        </ul>
        <div class="w-full text-center mt-2">
            <form method="GET" action="/">
                <button class="w-full rounded-sm text-white bg-green-600 px-4 py-2 active:shadow-inner hover:bg-green-500">
                    Go to checkout
                </button>
            </form>
        </div>
    </div>
</div>
