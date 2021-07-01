@extends('layouts.store')

@section('content')
    <div class="w-full">
        <h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Adrese</h1>

        <div class="mb-4 pb-4 border-b">
            <h2 class="mb-4 pl-1 text-2xl font-semibold text-trueGray-300">Adauga adresa</h2>
            <form method="POST" action="{{ route('address.store') }}">
                @csrf

                <div class="w-full flex flex-col gap-4 md:flex-row md:items-center">
                    <div class="w-full">
                        <label for="address" class="block text-trueGray-400 font-semibold mb-2">Adresa</label>
                        {{-- error zone --}}
                        <input type="text" id="address" name="address" value="{{ old('newAddress') }}"
                            class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600"
                            placeholder="Strada, Nr, Bloc/Casa, Apartament, Etaj...">
                    </div>
                </div>

                <div class="w-full mt-4">
                    <button type="submit" class="w-full bg-green-600 text-white p-2 rounded-sm">
                        Save
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
                        <li class="bg-trueGray-50 rounded shadow-md mt-3 first:mt-0 p-2 @if ($address->is_selected == 1) border-2 border-orange-600 @endif">
                            <div>
                                {{ $loop->iteration }}. <span id="av{{$address->id}}">{{ $address->address }}</span>
                            </div>
                            <div class="flex items-center justify-end gap-x-4 text-sm">
                                @if (!$address->is_selected)
                                    <form method="POST" action="{{ route('address.update', ['id' => $address->id]) }}">
                                        @csrf
                                        @method('PUT')
                                        <input type="hidden" name="isSelected" value="1" />
                                        <button class="text-sky-600 hover:text-sky-500">Selecteaza</button>
                                    </form>
                                @endif
                                <div>
                                    <form id="amf{{ $address->id }}" method="POST"
                                        action="{{ route('address.update', ['id' => $address->id]) }}"
                                        style="display: none"
                                        class="fixed top-1/2 left-0 transform -translate-y-1/2 w-full md:left-1/2 md:-translate-x-1/2 md:w-3/4 lg:w-1/2 2xl:w-1/4 flex-col items-center justify-center z-30 bg-white md:rounded address-edit-form">
                                        @csrf
                                        @method('PUT')
                                        <input type=" text" id="address" name="address"
                                            class="w-full border p-2 rounded-sm focus:ring focus:ring-orange-600"
                                            placeholder="Strada, Nr, Bloc/Casa, Apartament, Etaj...">
                                    </form>
                                    <button id="amb{{ $address->id }}"
                                        class="text-sky-600 hover:text-sky-500 address-edit-btn">Modificare</button>
                                </div>
                                <form method="POST" action="{{ route('address.delete', ['id' => $address->id]) }}">
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
    </div>
@endsection

@push('scripts')

    <script>
        $('.address-edit-btn').each(function(index, button) {

            button.addEventListener("click", function() {
                const id = this.id.substring(3);
                const form = $(`#amf${id}`)
                const originalValueField = $(`#av${id}`);

                $('#backdrop').fadeIn();
                console.log(originalValueField.text())
                form[0][2].val( originalValueField.text());
                form.fadeIn();
                $('#backdrop').click(function() {
                    form.fadeOut();
                });
            })
        })
    </script>
@endpush
