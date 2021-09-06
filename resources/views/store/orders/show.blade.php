@extends('layouts.store')


@section('content')
<div class="w-full md:w-3/4 lg:w-1/2 2xl:w-2/5 mx-auto pt-4 px-4">
	{{ Breadcrumbs::render('order', $order) }}
	{{-- <a href=" {{ route('orders.index') }}" class="text-sm text-orange-600 flex items-center hover:underline">
	<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px">
		<path d="M0 0h24v24H0V0z" fill="none" />
		<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
	</svg>
	Inapoi la lista comenzilor
	</a> --}}


	<div class="flex flex-wrap items-center justify-between">
		<h1 class="text-4xl my-4 pl-2 font-semibold text-trueGray-300 ">Comanda #{{ $order->id }} </h1>
		<div id="finalStatus" class="text-xs py-1 px-2 rounded-sm font-semibold " style="display: none">
		</div>
	</div>

	<div id="statusTracker">
		<h2 class="text-lg text-trueGray-300 my-4 pl-2">Stare comanda</h2>
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
				<div id="isPreparingLine" class="h-full w-1 bg-trueGray-700 md:h-1 md:w-full"></div>
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
						class="italic tex-sm text-trueGray-700">({{ $order->deliveryMethod->price }} Ron)</span></span>
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
			<x-order-item :item="$item" :loop="$loop"></x-order-item>
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
                        .addClass('bg-teal-200 text-teal-800');
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
                        .addClass('bg-teal-200 text-teal-800');

                    completedLine.removeClass('bg-trueGray-700').addClass('bg-trueGray-100');
                    completed.removeClass('text-trueGray-700 bg-transparent border border-trueGray-700')
                        .addClass('bg-green-200 text-green-800');

                    break;
                case 'canceled':
                    finalStatus.addClass('bg-red-300 text-red-900');
                    finalStatus.html('Anulata')
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
                finalStatus.html('Finalizata')
                finalStatus.addClass('bg-green-300 text-green-900');
            }

        } else {
            finalStatus.hide();
            statusTracker.show();

            statusUpdate(status.toLowerCase().replace(/\s/g, ''), false);

            window.Echo.private('orders.{{ $order->id }}').listen(".OrderStatusUpdated", (e) => {
                const status = e.status.name.toLowerCase().replace(/\s/g, '');
                statusUpdate(status, true);

            });
        }
</script>

@endpush