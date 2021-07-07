<div id="mobileCart" class="w-full lg:hidden" style="display: none">
    <div class="relative w-full bg-white p-2 group-hover:block lg:min-w-[300px] lg:rounded-sm">
        @if ($cart->itemsCount > 0)
            <div class="flex items-center justify-between border-b border-gray-800 pb-1 mb-1">
                <h4 class="text-lg font-semibold">Cart</h4>
                <button id="closeMobileCartBtn" class="absolute right-2 top-2 z-10 lg:hidden">
                    <svg class="fill-current" :class="{'text-white': !hasItems}" xmlns="http://www.w3.org/2000/svg" height="24px"
                        viewBox="0 0 24 24" width="24px" fill="#000000">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                </button>
            </div>
            <ul>
                @foreach ($cart->items as $item)
                    <li class="grid grid-cols-3 border-b my-1 py-1 px-2 last:border-0">
                        <div class="col-span-2">
                            <div class="text-sm font-semibold">
                                {{ $item->name }}
                            </div>
                            <div class="text-xs">x{{ $item->pivot->quantity }}</div>
                        </div>
                        <div class="text-sm self-center justify-self-end">
                            {{ $item->price }} Ron
                        </div>
                    </li>
                @endforeach
            </ul>
            <div class="w-full text-center mt-2 flex justify-between text-sm" v-if="hasItems">
                <a href="{{ route('order.create') }}" class="w-full rounded-sm text-white bg-green-600 px-4 py-1 active:shadow-inner hover:bg-green-500">
                    Go to checkout
                </a>
        
                <a href="{{ route('cart.index') }}" class="w-full rounded-sm text-white bg-sky-600 px-4 py-1 active:shadow-innerhover:bg-sky-500">
                    View Cart
                </a>
            </div>
        @else
            <div class="w-full bg-blue-500 font-medium text-xs text-white rounded py-1 px-2">
                Cosul de cumparaturi este gol
            </div>
        @endif
    
    </div>
</div>