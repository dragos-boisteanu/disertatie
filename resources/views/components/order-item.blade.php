@props(['item', 'loop'])

<li class="grid grid-cols-12 border-t border-gray-300">
    <div class="col-start-1 col-end-3 text-sm flex items-center justify-center border-r border-gray-300">
        {{ $loop->iteration }}
    </div>
    <div class="col-start-3 col-end-11 w-full md:flex md:items-center">
        <div class="w-full p-2 md:flex-1 ">
            <div class="font-semibold">
                {{ $item->name }} {{ $item->weight }} {{ $item->unit->name }}
            </div>
            <div class="text-sm text-trueGray-700">
                @foreach ($item->ingredients as $ingredient)
                    {{ $ingredient->name }},
                @endforeach
            </div>
        </div>
        <div class="h-full md:border-l md:border-gray-30 md:flex-1">
            <div class="flex items-center justify-evenly py-2 px-4 border-b border-gray-300">
                <div class="flex-1 text-sm text-center text-gray-800">x{{ $item->pivot->quantity }} buc.</div>

                <div class="flex-1 text-sm text-center">
                    <div>
                        {{ $item->getOrderProductFinalPrice($item->pivot->base_unit_price, $item->pivot->discount, $item->pivot->vat) }}
                    </div>
                    <div class="font-semibold"> Ron / buc.</div>
                </div>

            </div>
            <div class="flex items-center p-2 text-sm @if ($item->finalDiscount) justify-between @else justify-evenly @endif ">
                <div class="text-center flex-initial w-20">
                    <div>
                        {{ $item->pivot->base_unit_price }} Ron
                    </div>
                    <div class="font-bold text-xs">
                        Pret initial
                    </div>
                </div>
                <div class="text-center">
                    <div>
                        {{ $item->pivot->vat }} %
                    </div>
                    <div class="font-bold text-xs">
                        VAT
                    </div>
                </div>
                <div class="text-center">
                    @if ($item->pivot->discount)
                        <div>
                            {{ $item->pivot->discount }} %
                        </div>
                        <div class="font-bold text-xs">
                            Reducere
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
    <div
        class="col-start-11 col-end-13 flex flex-col items-center justify-center font-semibold border-l border-gray-300 text-sm">
        <div>Total</div>
        <div class="text-center">
            {{ $item->getOrderProductFinalPrice($item->pivot->base_unit_price, $item->pivot->discount, $item->pivot->vat) }}
            Ron</div>
    </div>
</li>
