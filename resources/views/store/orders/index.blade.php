@extends('layouts.store')


@section('content')

<div class="p-4">
	<h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Comenzile mele</h1>

	<div class="flex p-4 flex-col gap-y-4 md:flex-row md:gap-y-0 md:items-center md:justify-between">
		<div>
			<div class="bg-white rounded-sm flex items-stretch">
				<input id="searchInput"
					class="w-full border border-r-0 p-2 rounded-sm rounded-r-none text-sm focus:rounded-r-sm focus:ring focus:ring-orange-600"
					type="text" name="id" placeholder="ID comanda" value="{{ old('id') }}" />
				<a href="" id="searchLink"
					class="px-2 border border-l-0 rounded-sm rounded-l-none flex items-center justify-center">
					<svg class="fill-current text-trueGray-800" xmlns="http://www.w3.org/2000/svg" height="18px"
						viewBox="0 0 24 24" width="18px" fill="#000000">
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path
							d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
					</svg>
				</a>
			</div>
			<div id="searchInputError" class="text-sm font-semibold text-red-600 mt-2" style="display: none"></div>
		</div>

		<form id="orderByForm" method="GET" action="{{ route('orders.index') }}">
			<select id="orderBy" name="orderBy"
				class="w-full border border-r-0 p-2 rounded-sm rounded-r-none text-sm focus:ring focus:ring-orange-600">
				<option value="1" {{ $orderBy == 1 ? 'selected' : '' }}>Cele mai recente</option>
				<option value="2" {{ $orderBy == 2 ? 'selected' : '' }}>Cele mai vechi</option>
			</select>
		</form>
	</div>

	<ul class="mt-4">
		@forelse($orders as $order)
		<li class="flex items-center bg-trueGray-50 rounded shadow-md mt-3 first:mt-0 border  hover:border-orange-600">
			<a href="{{ route('orders.show', ['id' => $order->id]) }}" class="p-2 block w-full text-sm">
				<div class="flex items-center justify-between">
					<div class="text-lg text-trueGray-800 font-semibold">
						#{{ $order->id }}
					</div>
					<x-statuses.order-status :statusName="$order->status->name"></x-statuses.order-status>
				</div>

				<div class="flex items-center justify-between my-2">
					<div>
						{{ $order->deliveryMethod->name }}
					</div>
					<div>
						{{ $order->created_at }}
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div>
						{{ $order->totalQuantity }} <span
							class="font-semibold">produs{{ $order->totalQuantity > 1 ? 'e' : '' }}</span>
					</div>

					<div>
						<span class="font-semibold">Total</span> {{ $order->totalValue }} Ron
					</div>
				</div>
			</a>
		</li>
		@empty
		<li
			class="w-full h-full mt-8 text-gray-700 text-opacity-75 text-4xl flex items-center justify-center font-semibold">
			Nu ai facut nici o comanda pana acum.
		</li>
		@endif
	</ul>

	<div class="mt-2">
		{{ $orders->links() }}
	</div>
</div>

@endsection


@push('scripts')
<script>
	$('#orderBy').change(function() {
			$('#orderByForm').submit();
	})

	$('#searchLink').click(function(event) {
			event.preventDefault();

			const searchInputValue = $('#searchInput').val();
			const searchInputError = $('#searchInputError');

			if (searchInputValue.length > 0)
					if (/^\d+$/.test(searchInputValue)) {
							$('#searchLink').attr('href', `/account/orders/${searchInputValue}`);
							window.location = $('#searchLink').attr('href')
					} else {
							searchInputError.html('ID-ul trebuie sa fie numeric');
							searchInputError.show();
					}
			else {
					searchInputError.html('Nici un ID nu a fost specificat');
					searchInputError.show();
			}

	})
</script>
@endpush