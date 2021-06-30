@extends('layouts.store')


@section('content')
    <div class="w-full">
        <h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Account details</h1>
        <div>
            <h2 class="mb-4 pl-1 text-3xl font-semibold text-trueGray-300">General</h2>
            @if (session('message'))
                <div id="notification"
                    class="w-full animate__animated bg-blue-500 font-medium text-sm text-white rounded p-4 my-2">
                    {{ session('message') }}
                </div>
            @endif
            <form method="POST" action="{{ route('account.update') }}" class="text-sm">
                @csrf
                @method('PUT')

                <div class="w-full flex flex-col gap-4 md:flex-row md:items-center">
                    <div class="w-full">
                        <label for="firstName" class="block text-trueGray-400 font-semibold mb-2">First Name</label>
                        {{-- error zone --}}
                        <input type="text" id="firstName" name="firstName"
                            value="{{ old('firstName', $user->first_name) }}"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>
                    <div class="w-full">
                        <label for="lastName" class="block text-trueGray-400 font-semibold mb-2">Last Name</label>
                        {{-- error zone --}}
                        <input type="text" id="lastName" name="lastName" value="{{ old('lastName', $user->last_name) }}"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>
                </div>

                <div class="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
                    <div class="w-full">
                        <label for="phoneNumber" class="block text-trueGray-400 font-semibold mb-2">Phone number</label>
                        {{-- error zone --}}
                        <input type="text" id="phoneNumber" name="phoneNumber"
                            value={{ old('phoneNumber', $user->phone_number) }}
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600" />
                    </div>
                    <div class="w-full">
                        <label for="email" class="block text-trueGray-400 font-semibold mb-2">Email</label>
                        {{-- error zone --}}
                        <input type="text" id="email" name="email" value="{{ $user->email }}" disabled
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>
                    <div class="w-full">
                        <label for="newEmail" class="block text-trueGray-400 font-semibold mb-2">New email</label>
                        {{-- error zone --}}
                        <input type="text" id="newEmail" name="newEmail" value="{{ old('newEmail') }}"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>
                </div>

                <div class="w-full mt-4">
                    <button type="submit" class="w-full bg-green-600 text-white p-2 rounded-sm">
                        Update
                    </button>
                </div>
            </form>
        </div>
        <div>
            <h2 class="mt-8 mb-4 pl-1 text-3xl font-semibold text-trueGray-300">Security</h2>
            <form method="POST" action="{{ route('account.update') }}" class="text-sm">
                @csrf
                @method('PUT')

                <div class="flex flex-col gap-4 md:flex-row md:items-center">
                    <div class="w-full">
                        <label for="phoneNumber" class="block text-trueGray-400 font-semibold mb-2">Password</label>
                        {{-- error zone --}}
                        <input type="password" id="password" name="password"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600" />
                    </div>
                    <div class="w-full">
                        <label for="repeatPassword" class="block text-trueGray-400 font-semibold mb-2">Repeat
                            password</label>
                        {{-- error zone --}}
                        <input type="password" id="repeatPassword" name="repeatPassword"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>
                </div>

                <div class="w-full mt-4">
                    <button type="submit" class="w-full bg-green-600 text-white p-2 rounded-sm">
                        Update password
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('scripts')

<script>
    $(document).ready(function() {
        

    })
</script>
@endpush
