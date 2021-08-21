@extends('layouts.store')

@section('content')
{{ Breadcrumbs::render('reservation', $reservation) }}

<div class="flex items-center justify-between">
	<h1 class="text-4xl my-4 max-w-[240px]  font-semibold text-trueGray-300 ">Reservare #{{ $reservation->id }} </h1>
	<x-statuses.reservation-status :statusName="$reservation->status->name"></x-statuses.reservation-status>
</div>

<div class="flex flex-col items-cente gap-4">
	<div class="w-full text-sm bg-trueGray-50 rounded shadow-md p-2 flex flex-col gap-y-2">
		<div>
			<span class="font-semibold">Incepand cu: </span>
			<span>{{ Carbon\Carbon::createFromDate($reservation->begins_at)->addMinutes(30)->format('d-m-Y H:i:s') }}</span>
		</div>
		<div>
			<span class="font-semibold">Creata in data de: </span>
			<span>{{ $reservation->created_at->format('d-m-Y H:i:s') }}</span>
		</div>
	</div>

	<div class="w-full text-sm bg-trueGray-50 rounded shadow-md p-2 flex flex-col gap-y-2">
		<div>
			<span>{{ $reservation->seats }}</span>
			<span class="font-semibold">locuri</span>
		</div>
		<div class="flex items-center gap-x-2">
			<span class="font-semibold">Mese: </span>
			<ul class="flex items-center gap-x-2">
				@foreach($reservation->tables as $table)
				<li>{{ $table->name }}</li>
				@endforeach
			</ul>
		</div>
		@isset($reservation->staff_id)
		<div>
			<span class="font-semibold">Operator</span>
			<span>{{ $reservation->staff->fullName }}</span>
		</div>
		@endisset
	</div>

	@isset($reservation->orders)
	<div class="w-full text-sm bg-trueGray-50 rounded shadow-md p-2">
		<div class="flex items-center justify-between hover:cursor-pointer">
			<div class="font-bold">Comenzi</div>
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
					<path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
					<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
				</svg>
				<!-- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
											<path d="M0 0h24v24H0V0z" fill="none" />
											<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
										</svg> -->
			</div>
		</div>
	</div>
	@endisset

	@if($canCancel)

	<form id="cancelReservationForm" method="post"
		action="{{ route('reservations.destroy', ['reservation'=>$reservation->id]) }}">
		@csrf
		@method('DELETE')

		<button id="cancelReservationBtn"
			class="px-2 py-1 text-sm bg-red-600 text-white rounded-sm hover:bg-red-500 active:shadow-inner">Anuleaza
			rezervarea</button>
	</form>

	@endif

	<div id="cancelOrderModel" class="modal text-sm">
		<div class="my-4">Sunteti sigur ca doriti sa anulati rezervarea ?</div>
		<div class="w-full flex items-center justify-end gap-x-4">
			<button id="confirmReservationCancel"
				class="px-6 py-1 rounded text-white bg-green-600 hover:bg-green-500 active:shadow-inner">Da</button>
			<a href="#" rel="modal:close"
				class="px-6 py-1 rounded border text-gray-600 hover:border-black hover:text-black active:shadow-inner">Nu</a>
		</div>
	</div>
</div>
@endsection

@push('scripts')
<script>
	const cancelOrderModel = $('#cancelOrderModel');

	$('#cancelReservationBtn').click(function(event) {
		event.preventDefault();
		cancelOrderModel.modal({
			fadeDuration: 150,
			fadeDelay: 0.50
		});
	})

	$('#confirmReservationCancel').click(function() {
		$('#cancelReservationForm').submit();
	})



</script>

@endpush