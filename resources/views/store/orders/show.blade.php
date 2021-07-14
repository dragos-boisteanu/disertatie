@extends('layouts.store')


@section('content')
    <div class="w-full lg:w-2/4 2xl:w-1/3">
        <a href=" {{ route('orders.index') }}" class="text-sm text-orange-600 flex items-center hover:underline">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
            </svg>
            Inapoi la lista comenzilor
        </a>

        <div class="flex flex-wrap items-center justify-between">
            <h1 class="text-4xl my-4 pl-2 font-semibold text-trueGray-300 ">Comanda #{{ $order->id }} </h1>
            <div id="finalStatus" class="text-xs py-1 px-2 rounded-sm font-semibold " style="display: none">
                Anulata
            </div>
        </div>


        <div id="statusTracker">
            <h2 class="text-lg text-trueGray-300 my-4 pl-2">Statut comanda</h2>
            <ul class="flex flex-col md:flex-row md:w-full">
                <li class="relative h-14 flex items-start gap-x-2 md:w-1/5 md:flex-col md:gap-x-0 md:gap-y-2">
                    <div class="h-full w-1 bg-trueGray-100 md:h-1 md:w-full"></div>
                    <div class="md:pr-1">
                        <div class="flex-grow-0 text-xs py-1 px-2 rounded-sm font-semibold bg-sky-200 text-sky-800">
                            Primita
                        </div>
                    </div>
                </li>
                <li class="h-14 flex items-start gap-x-2 md:w-1/5 md:flex-col md:gap-x-0 md:gap-y-2">
                    <div id="isPreparingLine" class="h-full w-1bg-trueGray-700 md:h-1 md:w-full"></div>
                    <div class="md:pr-1">
                        <div id="isPreparing"
                            class="text-xs py-1 px-2 rounded-sm font-semibold text-trueGray-700 bg-transparent border border-trueGray-700">
                            Se pregateste
                        </div>
                    </div>
                </li>
                {{-- bg-orange-200 text-orange-800 --}}
                <li class="h-14 flex items-start gap-x-2 md:w-1/5 md:flex-col md:gap-x-0 md:gap-y-2">
                    <div id="inDeliveryLine" class="h-full w-1 bg-trueGray-700 md:h-1 md:w-full"></div>
                    <div class="md:pr-1">
                        <div id="inDelivery"
                            class="text-xs py-1 px-2 rounded-sm  font-semibold text-trueGray-700 bg-transparent border border-trueGray-700">
                            Se livreaza
                        </div>
                    </div>
                </li>
                {{-- bg-sky-200 text-sky-800 --}}
                <li class="h-14 flex items-start gap-x-2 md:w-1/5 md:flex-col md:gap-x-0 md:gap-y-2">
                    <div id="deliveredLine" class="h-full w-1 bg-trueGray-700 md:h-1 md:w-full"></div>
                    <div class="md:pr-1">
                        <div id="delivered"
                            class="text-xs py-1 px-2 rounded-sm font-semibold text-trueGray-700 bg-transparent border border-trueGray-700">
                            Livrata
                        </div>
                    </div>
                </li>
                {{-- bg-yellow-200 text-yellow-800 --}}
                <li class="h-6 flex items-start gap-x-2 md:w-1/5 md:h-14 md:flex-col md:gap-x-0 md:gap-y-2">
                    <div id="completedLine" class="h-full w-1 bg-trueGray-700 md:h-1 md:w-full"></div>
                    <div id="completed"
                        class="text-xs py-1 px-2 rounded-sm font-semibold text-trueGray-700 bg-transparent border border-trueGray-700">
                        Finalizata
                    </div>
                </li>
                {{-- bg-green-200 text-green-800 --}}
            </ul>
        </div>

        <div>
            <h2 class="text-lg text-trueGray-300 my-4 pl-2">Detalii comanda</h2>
            <div class="text-sm bg-trueGray-50 rounded shadow-md p-2 flex flex-col gap-y-2 ">
                <div>
                    <span class="font-semibold">Creata in data de: </span>
                    <span>{{ $order->created_at }}</span>
                </div>
                <div>
                    <span class="font-semibold">Ultimul update: </span>
                    <span>{{ $order->updated_at }}</span>
                </div>
                <div>
                    <span class="font-semibold">Metoda livrare: </span>
                    <span>{{ $order->deliveryMethod->name }} <span
                            class="italic tex-sm text-trueGray-700">({{ $order->deliveryMethod->price }}
                            Ron)</span></span>
                </div>

                @if ($order->deliveryMethod->isTable)
                    <div>
                        <span class="font-semibold">Masa: </span>
                        <span>{{ $order->table->name }}</span>
                    </div>
                @elseIf($order->deliveryMethod->isDelivery)
                    <div>
                        <span class="font-semibold">Adresa: </span>
                        <span>{{ $order->address }}</span>
                    </div>
                @endif

                @isset($order->staff)
                    <div>
                        <span class="font-semibold">Operator: </span>
                        <span>{{ $order->staff->fullName }}</span>
                    </div>
                @endisset

                @isset($order->observations)
                    <div>
                        <span class="font-semibold">Observatii: </span>
                        <pre>{{ $order->observations }}</pre>
                    </div>
                @endisset
            </div>
        </div>

        <div>
            <h2 class="text-lg text-trueGray-300 my-4 pl-2">Produse</h2>
            <ul class="bg-trueGray-50 rounded shadow-md mt-3">
                @foreach ($order->products as $item)
                    <li class="grid grid-cols-12 border-t border-gray-300">
                        <div
                            class="col-start-1 col-end-3 text-sm flex items-center justify-center border-r border-gray-300">
                            {{ $loop->iteration }}
                        </div>
                        <div class="col-start-3 col-end-11 w-full md:flex md:items-center">
                            <div class="w-full p-2 md:flex-1 ">
                                <div class="font-semibold">
                                    {{ $item->name }}
                                </div>
                                <div class="text-sm text-trueGray-700">
                                    @foreach ($item->ingredients as $ingredient)
                                        {{ $ingredient->name }},
                                    @endforeach
                                </div>
                            </div>
                            <div class="h-full md:border-l md:border-gray-30 md:flex-1">
                                <div class="flex items-center justify-between py-2 px-4 border-b border-gray-300">

                                    <div class="text-sm text-gray-800">x{{ $item->pivot->quantity }} buc.</div>

                                    <div class="flex-initial text-sm text-center font-semibold">
                                        {{ $item->price }} Ron / buc.
                                    </div>

                                </div>
                                <div class="flex items-center justify-between p-2 text-sm">
                                    <div class="text-center flex-initial w-20">
                                        <div>
                                            {{ $item->base_price }} Ron
                                        </div>
                                        <div class="font-bold text-xs">
                                            Pret initial
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <div>
                                            9 %
                                        </div>
                                        <div class="font-bold text-xs">
                                            VAT
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        {{-- @if ($item->discount) --}}
                                        <div>
                                            - 2 %
                                        </div>
                                        <div class="font-bold text-xs">
                                            Reducere
                                        </div>
                                        {{-- @endif --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="col-start-11 col-end-13 flex flex-col items-center justify-center font-semibold border-l border-gray-300 text-sm">
                            <div>Total</div>
                            <div class="text-center">{{ $item->price * $item->pivot->quantity }} Ron</div>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>

        <div class="my-4 bg-trueGray-50 rounded p-2 flex items-center justify-end gap-x-4">
            <div class="font-semibold text-center">
                <div>TOTAL</div>
                <div class="text-xs italic text-trueGray-700">(include taxa de transport)</div>
            </div>
            <div>
                {{ $order->totalValue }} Ron
            </div>
        </div>
    </div>

@endsection


@push('scripts')

    <script>
        const status = "{{ $order->status->name }}";

        const finalStatus = $('#finalStatus');
        const statusTracker = $('#statusTracker');

        const statusUpdate = function(status, animate) {
            const isPreparingLine = $('#isPreparingLine');
            const isPreparing = $('#isPreparing');

            const inDeliveryLine = $('#inDeliveryLine');
            const inDelivery = $('#inDelivery');

            const deliveredLine = $('#deliveredLine');
            const delivered = $('#delivered');

            switch (status) {
                case 'ispreparing':
                    if (animate) {
                        isPreparingLine.addClass('transition-colors !duration-700');
                        isPreparing.addClass('transition-colors !duration-700');
                    }

                    isPreparingLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    isPreparing.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-orange-200 text-orange-800');
                    break;

                case 'indelivery':
                    if (animate) {
                        isPreparingLine.addClass('transition-colors !duration-700');
                        isPreparing.addClass('transition-colors !duration-700');

                        inDeliveryLine.addClass('transition-colors !duration-700');
                        inDelivery.addClass('transition-colors !duration-700');
                    }

                    isPreparingLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    isPreparing.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-orange-200 text-orange-800');

                    inDeliveryLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    inDelivery.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-yellow-200 text-yellow-800');
                    break;

                case 'delivered':
                    if (animate) {
                        isPreparingLine.addClass('transition-colors !duration-700');
                        isPreparing.addClass('transition-colors !duration-700');

                        inDeliveryLine.addClass('transition-colors !duration-700');
                        inDelivery.addClass('transition-colors !duration-700');

                        deliveredLine.addClass('transition-colors !duration-700');
                        delivered.addClass('transition-colors !duration-700');
                    }

                    isPreparingLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    isPreparing.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-orange-200 text-orange-800');

                    inDeliveryLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    inDelivery.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-yellow-200 text-yellow-800');

                    deliveredLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    delivered.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-teal-200 text-team-800');
                    break;

                case 'completed':
                    const completedLine = $('#completedLine');
                    const completed = $('#completed');

                    if (animate) {
                        isPreparingLine.addClass('transition-colors !duration-700');
                        isPreparing.addClass('transition-colors !duration-700');

                        inDeliveryLine.addClass('transition-colors !duration-700');
                        inDelivery.addClass('transition-colors !duration-700');

                        deliveredLine.addClass('transition-colors !duration-700');
                        delivered.addClass('transition-colors !duration-700');

                        completedLine.addClass('transition-colors !duration-700');
                        completed.addClass('transition-colors !duration-700');
                    }

                    isPreparingLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    isPreparing.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-orange-200 text-orange-800');

                    inDeliveryLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    inDelivery.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-yellow-200 text-yellow-800');

                    deliveredLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    delivered.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-teal-200 text-team-800');

                    completedLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    completed.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-green-200 text-green-800');
                    break;
                case 'canceled':
                    finalStatus.addClass('bg-red-300 text-red-900');
                    finalStatus.fadeIn();
                    statusTracker.slideUp();

                    break;
            }
        }

        if (status == 'Canceled' || status == 'Completed') {

            finalStatus.show();
            statusTracker.hide();

            if (status == 'Canceled') {
                finalStatus.addClass('bg-red-300 text-red-900');
            } else {
                finalStatus.addClass('bg-green-300 text-green-900');
            }
        } else {

            finalStatus.hide();
            statusTracker.show();

            statusUpdate(status.toLowerCase().replace(/\s/g, ''), false);

            window.Echo.private('orders.{{ $order->id }}').listen("OrderStatusUpdate", (e) => {
                const status = e.status.toLowerCase().replace(/\s/g, '');
                statusUpdate(status, true);

            });
        }
    </script>

@endpush
