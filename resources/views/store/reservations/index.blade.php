@extends('layouts.store')


@section('content')
    <h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Rezervarile mele</h1>

    <div class="mb-4 pb-4 border-b">
        <h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Rezerva masa</h2>
        <form method="POST" action="{{ route('reservations.store') }}">
            @csrf

            <div class="w-full">
                <div class="w-full flex gap-4 items-center justify-between">
                    <div class="flex-1 w-full flex flex-col gap-2">
                        <label for="address" class="block text-trueGray-400 font-semibold">Data</label>
                        {{-- error zone --}}
                        <input type="text" id="datepicker" name="datepicker"
                            class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>

                    <div class="flex-1 w-full flex flex-col gap-2">
                        <label for="address" class="block text-trueGray-400 font-semibold">Ora</label>
                        {{-- error zone --}}
                        <input type="text" id="timepicker" name="timepicker"
                            class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>
                </div>

                <div class="w-full mt-4 flex flex-col gap-2">
                    <label for="address" class="block text-trueGray-400 font-semibold">Numar persoane</label>
                    {{-- error zone --}}
                    <input id="seatsInput" type="number" id="seats" name="seats" value="{{ old('seats') }}"
                        class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600">
                </div>
            </div>

            <div class="w-full lg:text-right mt-4">
                <button id="addressBtn" type="submit"
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
        <h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Lista rezervari</h2>

    </div>
@endsection


@push('scripts')
    <script>

        $("#datepicker").datepicker({
            showButtonPanel: false,
            dateFormat: 'dd-mm-yy'
        });

        $("#timepicker").timepicker({
            showButtonPanel: true,
            controlType: 'select',
            oneLine: false,
            timeFormat: 'hh:mm tt',
            stepHour: 1,
            stepMinute: 15,
        });
    </script>
@endpush
