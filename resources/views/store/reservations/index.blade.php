@extends('layouts.store')


@section('content')
    <h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Rezervarile mele</h1>

    <div class="mb-4 pb-4 border-b">
        <h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Rezerva masa</h2>
        <form method="POST" action="{{ route('reservations.store') }}">
            @csrf

            <div class="w-full flex gap-4 items-center justify-between">
                <div class="flex-1 w-full flex flex-col gap-2">
                    <label for="datepicker" class="block text-trueGray-400 font-semibold">Data</label>
                    {{-- error zone --}}
                    <input type="text" id="datepicker" name="datepicker" value="{{ old('datepicker') }}"
                        class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
                </div>

                <div class="flex-1 w-full flex flex-col gap-2">
                    <label for="timepicker" class="block text-trueGray-400 font-semibold">Ora</label>
                    {{-- error zone --}}
                    <input type="text" id="timepicker" name="timepicker" disabled value="{{ old('timepicker') }}"
                        class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
                </div>

                <div class="flex-1 w-full flex flex-col gap-2">
                    <label for="seatsInput" class="block text-trueGray-400 font-semibold">Numar persoane</label>
                    {{-- error zone --}}
                    <input id="seatsInput" type="text" id="seats" name="seats" disabled value="{{ old('seats') }}"
                        min="1" step="1" class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">

                    <div id="seatsInputErrors" style="display: none">

                    </div>
                </div>
            </div>

            <div class="w-full lg:text-right mt-4">
                <button id="reserveBtn" disabled type="submit"
                    class="w-full lg:w-auto bg-green-600 hover:bg-green-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
                    Rezerva
                </button>
            </div>
        </form>
    </div>

    <div class="mb-4 pb-4 border-b">
        <h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Rezervare activa</h2>
    </div>

    <div class="mb-4 pb-4 border-b">
        <h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Lista rezervari</h2>x
    </div>
@endsection


@push('scripts')
    <script>
        const datepicker = $('#datepicker');
        const timepicker = $('#timepicker');
        const seatsInput = $('#seatsInput');
        const seatsInputErrors = $('#seatsInputErrors');
        const reserveBtn = $('#reserveBtn');

        datepicker.datepicker({
            showButtonPanel: false,
            dateFormat: 'dd-mm-yy',
            minDate: 1
        });

        timepicker.timepicker({
            showButtonPanel: true,
            controlType: 'select',
            oneLine: false,
            timeFormat: 'hh:mm tt',
            stepHour: 1,
            stepMinute: 15,
            minTime: "10:00 am",
            maxTime: "11:00 pm"
        });

        datepicker.change(function() {
            timepicker.prop('disabled', false);
            if (timepicker.val() && datepicker.val() && seatsInput.val()) {
                checkAvailableTables(datepicker.val(), timepicker.val(), seatsInput.val(), seatsInputErrors);
            }
        })

        timepicker.change(function() {
            seatsInput.prop('disabled', false);
            if (timepicker.val() && datepicker.val() && seatsInput.val()) {
                checkAvailableTables(datepicker.val(), timepicker.val(), seatsInput.val(), seatsInputErrors);
            }
        })

        seatsInput.change(function() {
            if (timepicker.val() && datepicker.val() && seatsInput.val()) {
                checkAvailableTables(datepicker.val(), timepicker.val(), seatsInput.val(), seatsInputErrors);
            }
        })


        const validateSeatsInput = function(value) {
            const result = {
                value: true,
                message: ''
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

        const checkAvailableTables = function(date, time, seats, seatsInputErrors) {
            const seatsInputValidationResult = validateSeatsInput(seatsInput.val());
            console.log(seatsInputValidationResult)
            if (seatsInputValidationResult.value) {
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
                        seatsInputErrors.hide();
                        seatsInputErrors.html("");
                        console.log(response)
                    },
                    error: function(xhr) {

                    }
                });
            } else {
                const template =
                    `<div class="text-xs font-semibold text-red-600 backend-validation-error">${seatsInputValidationResult.message}</div>`
                seatsInputErrors.show();
                seatsInputErrors.html(template)
            }


        }
    </script>


@endpush
