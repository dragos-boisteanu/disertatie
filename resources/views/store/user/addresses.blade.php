@extends('layouts.store')

@section('content')

<div class="w-full md:w-3/4 lg:w-1/2 2xl:w-2/5 mx-auto pt-4 px-4">
	<h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Adrese</h1>

	<div class="mb-4 pb-4 border-b">
		<h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Adauga adresa</h2>
		<form id="newAddressForm" method="POST" action="{{ route('address.store') }}">
			@csrf

			<div class="w-full flex flex-col gap-4 md:flex-row md:items-center">
				<div class="w-full">
					<label for="address" class="block text-trueGray-400 font-semibold mb-2">Adresa</label>
					{{-- error zone --}}
					<input id="addressInput" type="text" id="address" name="address" value="{{ old('newAddress') }}"
						class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600"
						placeholder="Strada, Nr, Bloc/Casa, Apartament, Etaj...">
				</div>
			</div>

			<div class="w-full lg:text-right mt-4">
				<button id="addressBtn" type="submit" disabled
					class="w-full lg:w-auto bg-green-600 hover:bg-green-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
					Adauga adresa
				</button>
			</div>
		</form>
	</div>

	@foreach ($addresses as $address)
	@if ($address->is_selected)
	<div class="mb-4 pb-4 border-b">
		<h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Adresa principala</h2>
		<div class="bg-trueGray-50 rounded shadow-md mt-3 first:mt-0 p-2">
			{{ $address->address }}
		</div>
	</div>
	@endif
	@endforeach

	@if (isset($addresses) && $addresses->count() > 0)
	<div>
		<h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">List</h2>
		<ul>
			@foreach ($addresses as $address)
			<li class="bg-trueGray-50 rounded shadow-md mt-3 first:mt-0 p-2 @if ($address->
                        is_selected == 1) border-2 border-orange-600 @endif">
				<div>
					{{ $loop->iteration }}. <span id="av{{ $address->id }}">{{ $address->address }}</span>
				</div>
				<div class="flex items-center justify-end gap-x-4 text-sm">
					@if (!$address->is_selected)
					<form method="POST" action="{{ route('address.update', ['id' => $address->id]) }}" class="mb-0">
						@csrf
						@method('PUT')
						<input type="hidden" name="isSelected" value="1" />
						<button class="text-sky-600 hover:text-sky-500">Selecteaza</button>
					</form>
					@endif
					<div>
						<form id="amf{{ $address->id }}" method="POST"
							action="{{ route('address.update', ['id' => $address->id]) }}" style="display: none"
							class="modal p-4 fixed  w-full flex-col items-center justify-center z-30 bg-white md:rounded address-edit-form">
							@csrf
							@method('PUT')
							<h3 class="mb-4 pl-1 text-xl font-semibold text-trueGray-800">Editeaza adresa</h3>
							<label for="address{{ $address->id }}" class="block text-trueGray-700 font-semibold mb-2">Adresa</label>
							<input type="text" id="address{{ $address->id }}" name="address"
								class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600"
								placeholder="Strada, Nr, Bloc/Casa, Apartament, Etaj...">
							<div class="w-full flex items-center justify-end mt-4">
								<button id="cancelBtn{{ $address->id }}" type="submit"
									class="text-red-600 hover:text-red-500 active:shadow-inner p-2 mr-2 rounded-sm">
									Anuleaza
								</button>
								<button id="saveBtn{{ $address->id }}" type="submit"
									class="bg-green-600 hover:bg-green-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
									Salveaza
								</button>
							</div>
						</form>

						<button id="amb{{ $address->id }}"
							class="text-sky-600 hover:text-sky-500 address-edit-btn">Modificare</button>
					</div>
					<form method="POST" action="{{ route('address.delete', ['id' => $address->id]) }}" class="mb-0">
						@csrf
						@method('DELETE')
						<button class="text-red-600 hover:text-red-500">Sterge</button>
					</form>
				</div>
			</li>
			@endforeach
		</ul>
	</div>
	@endif
	@endsection
</div>


@push('scripts')

<script>
	const addressInput = $('#addressInput');
        const addressBtn = $('#addressBtn');

        if (addressInput.val().length !== 0) {
          addressBtn.prop('disabled', false);
        }

				addressBtn.click(function(event) {
					event.preventDefault();
					if (addressInput.val().length !== 0) {
						$('#newAddressForm').submit();
					}
				})

        addressInput.keyup(function() {
            if (addressInput.val().length === 0) {
                addressBtn.prop('disabled', true)
            } else {
                addressBtn.prop('disabled', false);
            }
        })

        $('.address-edit-btn').each(function(index, button) {
            button.addEventListener("click", function() {
                const id = this.id.substring(3);
                const form = $(`#amf${id}`)
                const originalValueField = $(`#av${id}`);
                const cancelBtn = $(`#cancelBtn${id}`);
                const saveBtn = $(`#saveBtn${id}`);
                const addressInput = $(`#address${id}`)

                form.modal({
                    fadeDuration: 150,
                    fadeDelay: 0.50
                });

                addressInput.val(originalValueField.text());

                addressInput.keyup(function() {
                    if (addressInput.val().length === 0) {
                        saveBtn.prop('disabled', true)
                    } else {
                        saveBtn.prop('disabled', false);
                    }
                })

                cancelBtn.click(function(event) {
                    event.preventDefault();
                    saveBtn.prop('disabled', false);
                    $.modal.close();
                })
            })
        })
</script>
@endpush