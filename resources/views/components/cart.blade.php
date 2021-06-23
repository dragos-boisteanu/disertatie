<div id="{{ $id }}"
    class="relative w-full bg-white p-2 group-hover:block hidden lg:absolute lg:-bottom-24 lg:min-w-[300px] lg:right-0 lg:rounded-sm">
    <div class="flex items-center justify-between border-b border-gray-800 pb-1 mb-1">
        <h4 class="text-lg font-semibold ">Cart</h4>
        {{ $slot }}
    </div>
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
    <div class="w-full text-center mt-2 flex justify-between text-sm">
        <form method="GET" action="/">
            <button class="w-full rounded-sm text-white bg-green-600 px-4 py-1 active:shadow-inner hover:bg-green-500">
                Go to checkout
            </button>
        </form>

        <form method="GET" action="/">
            <button class="w-full rounded-sm text-white bg-sky-600 px-4 py-1 active:shadow-inner hover:bg-sky-500">
                View Cart
            </button>
        </form>
    </div>
</div>
