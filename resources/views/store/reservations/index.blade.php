@extends('layouts.store')


@section('content')
<div class="w-full md:w-3/4 lg:w-1/2 2xl:w-2/5 mx-auto pt-4 px-4">
	<h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300">Rezervarile mele</h1>

	<div class="mb-4 pb-4 border-b">
		<h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Rezerva masa</h2>
		<form method="POST" action="{{ route('reservations.store') }}">
			@csrf

			<div class="w-full flex gap-4 items-center justify-between">
				<div class="flex-1 w-full flex flex-col gap-2">
					<label for="datepicker" class="block text-trueGray-400 font-semibold">Data</label>
					<input type="text" id="datepicker" name="date" value="{{ old('date') }}"
						class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
					<div id="dateValidationMessage" class="text-sm font-semibold text-red-600">
					</div>
				</div>

				<div class="flex-1 w-full flex flex-col gap-2">
					<label for="timepicker" class="block text-trueGray-400 font-semibold">Ora</label>
					<select id="timepicker" name="time" class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">>
						<option disabled selected>Alege ora</option>
						<option>10:30</option>
						<option>10:45</option>
						<option>11:00</option>
						<option>11:15</option>
						<option>11:30</option>
						<option>11:45</option>
						<option>12:00</option>
						<option>12:15</option>
						<option>12:30</option>
						<option>12:45</option>
						<option>13:00</option>
						<option>13:15</option>
						<option>13:30</option>
						<option>13:45</option>
						<option>14:00</option>
						<option>14:15</option>
						<option>14:30</option>
						<option>14:45</option>
						<option>15:00</option>
						<option>15:15</option>
						<option>15:30</option>
						<option>15:45</option>
						<option>16:00</option>
						<option>16:15</option>
						<option>16:30</option>
						<option>16:45</option>
						<option>16:00</option>
						<option>17:15</option>
						<option>17:30</option>
						<option>17:45</option>
						<option>18:00</option>
						<option>18:15</option>
						<option>18:30</option>
						<option>18:45</option>
						<option>19:00</option>
						<option>19:15</option>
						<option>19:30</option>
						<option>19:45</option>
						<option>20:00</option>
						<option>20:15</option>
						<option>20:30</option>
						<option>20:45</option>
						<option>21:00</option>
						<option>21:15</option>
						<option>21:30</option>
						<option>21:45</option>
					</select>
					<div id="timeValidationMessage" class="text-sm font-semibold text-red-600">
					</div>
				</div>

				<div class="flex-1 w-full flex flex-col gap-2">
					<label for="seatsInput" class="block text-trueGray-400 font-semibold">Locuri</label>
					<input id="seatsInput" type="text" id="seats" name="seats" value="{{ old('seats') }}" min="1" step="1"
						class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
					<div id="seatsValidationMessage" class="text-sm font-semibold text-red-600">
					</div>
				</div>
			</div>

			<div id="tablesFoundMessage" style="display: none" class="w-full mt-4 text-center">
			</div>

			<div class="w-full lg:text-right mt-4">
				<button id="checkTables" type="submit"
					class="w-full lg:w-auto bg-sky-600 hover:bg-sky-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
					Verifica disponibilitate mese
				</button>
				<button id="reserveBtn" type="submit" style="display: none"
					class="w-full lg:w-auto bg-green-600 hover:bg-green-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
					Rezerva
				</button>
			</div>
		</form>
	</div>

	<div class="mb-4">
		<h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Lista rezervari</h2>

		<div class=" flex flex-col gap-y-4 md:flex-row md:gap-y-0 md:items-center md:justify-between">
			<div>
				<div class="bg-white rounded-sm flex items-stretch">
					<input id="searchInput"
						class="w-full border border-r-0 p-2 rounded-sm rounded-r-none text-sm focus:rounded-r-sm focus:ring focus:ring-orange-600"
						type="text" name="id" placeholder="ID reservare" value="{{ old('id') }}" />
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

			<form id="orderByForm" method="GET" action="{{ route('reservations.index') }}">
				<select id="orderBy" name="orderBy"
					class="w-full border border-r-0 p-2 rounded-sm rounded-r-none text-sm focus:ring focus:ring-orange-600">
					<option value="1" {{ $orderBy == 1 ? 'selected' : '' }}>Cele mai recente</option>
					<option value="2" {{ $orderBy == 2 ? 'selected' : '' }}>Cele mai vechi</option>
				</select>
			</form>
		</div>

		<ul class="my-4">
			@forelse($reservations as $reservation)
			<li class="flex items-center bg-trueGray-50 rounded shadow-md mt-3 first:mt-0 border  hover:border-orange-600">
				<a href="{{ route('reservations.show', ['reservation' => $reservation->id]) }}"
					class="p-2 block w-full text-sm">
					<div class="flex items-center justify-between">
						<div class="text-lg text-trueGray-800 font-semibold">
							#{{ $reservation->id }}
						</div>
						<x-statuses.reservation-status :statusName="$reservation->status->name"></x-statuses.reservation-status>
					</div>

					<div class="flex items-center justify-between my-2">
						<div class="flex items-center">
							<span class="font-semibold mr-2">Mese: </span>
							<ul class="flex items-center gap-x-1">
								@foreach($reservation->tables as $table)
								<li>{{$table->name}},</li>
								@endforeach
							</ul>
						</div>

						<div>
							<span class="font-semibold">Incepand cu </span>
							{{ Carbon\Carbon::createFromDate($reservation->begins_at)->addMinutes(30)->format('d-m-Y H:i:s') }}
						</div>
					</div>

					<div class="flex items-center justify-between">
						<div>
							{{ $reservation->seats }} <span class="font-semibold"> locuri</span>
						</div>
						<div>
							<span class="font-semibold">Plasata la </span> {{ $reservation->created_at->format('d-m-Y H:i:s') }}
						</div>
					</div>
				</a>
			</li>
			@empty
			<li
				class="w-full h-full mt-8 text-gray-700 text-opacity-75 text-4xl flex items-center justify-center font-semibold">
				Nu aveti nici o rezervare
			</li>
			@endforelse
		</ul>
		<div class="mt-2">
			{{ $reservations->links() }}
		</div>
	</div>
</div>

@endsection


@push('scripts')
<script>
	const datepicker = $('#datepicker');
	const timepicker = $('#timepicker');
	const seatsInput = $('#seatsInput');
	const reserveBtn = $('#reserveBtn');
	const tablesFoundMessage = $('#tablesFoundMessage');
	const checkTablesBtn = $('#checkTables');

	datepicker.datepicker({
		showButtonPanel: false,
		dateFormat: 'dd-mm-yy',
		minDate: 1,
	});

	datepicker.change(function() {
		reserveBtn.hide();
		checkTablesBtn.show();
	})

	timepicker.change(function() {
		reserveBtn.hide();
		checkTablesBtn.show();
	})

	seatsInput.change(function() {
		reserveBtn.hide();
		checkTablesBtn.show();
	})

	checkTablesBtn.click(function (event) {
		event.preventDefault();

		const dateValidaiton = validateDateInput(datepicker.val());
		const timeValidation = validateTimeInput(timepicker.val());
		const seatsValidation = validateSeatsInput(seatsInput.val());

		let counter = 3;

		if(!dateValidaiton.value) {
			console.log(dateValidaiton.message);
			$('#dateValidationMessage').html(dateValidaiton.message)
			counter--;
		} else {
			$('#dateValidationMessage').html('')
		}

		if(!timeValidation.value) {
			console.log(timeValidation.message);
			$('#timeValidationMessage').html(timeValidation.message);
			counter--;
		} else {
			$('#timeValidationMessage').html('')
		}

		if(!seatsValidation.value) {
			console.log(seatsValidation.message);
			$('#seatsValidationMessage').html(seatsValidation.message)
			counter--;
		} else {
			$('#seatsValidationMessage').html('');
		}

		if (counter === 3) {
			checkAvailableTables(datepicker.val(), timepicker.val(), seatsInput.val());
		}
	})

	const validateDateInput = function(value) {
		const result = {
			value: true,
			message: ''
		}

		if(!value) {
			result.value = false
			result.message = 'Data trebuie selectata'

			return result
		}

		return result;
	}

	const validateSeatsInput = function(value) {
		const result = {
			value: true,
			message: ''
		}

		if(!value) {
			result.value = false
			result.message = 'Numarul de locuri trebuie completat'

			return result
		}

		if (isNaN(value)) {
			result.value = false
			result.message = 'Numarul de locuri trebuie sa fie numeric'

			return result
		}

		if (Number.isInteger(value)) {
			result.value = false
			result.message = 'Numarul de locuri trebuie sa fie numar intreg'

			return result
		}

		if (value < 1) {
			result.value = false
			result.message = 'Minimul de locuri care se pot rezerva este 1'

			return result;
		}

		return result;
	}

	const validateTimeInput = function(value) {
		const result = {
			value: true,
			message: ''
		}

		if(!value) {
			result.value = false
			result.message = 'Ora trebuie selectata'

			return result
		}

		return result;
	}

	const checkAvailableTables = function(date, time, seats) {
		$.ajax({
			url: "{{ route('available-tables') }}",
			data: {
					date,
					time,
					seats
			},
			cache: false,
			type: "GET",
			success: function(response) {
				if (response.tableMessage) {
				tablesFoundMessage.html(
					`<div class="w-full text-sm font-semibold text-green-600 backend-validation-error">${response.tableMessage}</div`
					)
				tablesFoundMessage.show();
					reserveBtn.show();
					checkTablesBtn.hide();
				}
			},
			error: function(xhr) {
				if (xhr.responseJSON.tableMessage) {
					tablesFoundMessage.html(
						`<div class="w-full text-sm font-semibold text-red-600 backend-validation-error">${xhr.responseJSON.tableMessage} </div`
						)
					tablesFoundMessage.show();
				}
			}
		});
	}
</script>
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
				$('#searchLink').attr('href', `/account/reservations/${searchInputValue}`);
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