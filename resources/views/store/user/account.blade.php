@extends('layouts.store')


@section('content')
    <div class="w-full lg:w-2/4 2xl:w-1/3">
        <h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Informatii cont</h1>

        <div>
            <h2 class="mb-4 pl-1 text-3xl font-semibold text-trueGray-300">General</h2>

            <form method="POST" action="{{ route('account.update') }}" class="text-sm">
                @csrf
                @method('PUT')

                <div class="w-full flex flex-col gap-4 md:flex-row md:items-center">
                    <div class="w-full">

                        <label for="firstName" class="block text-trueGray-400 font-semibold mb-2">Prenume</label>

                        {{-- error zone --}}
                        <input type="text" id="firstName" name="firstName"
                            value="{{ old('firstName', $user->first_name) }}"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif ">
                        @if ($errors->has('firstName'))
                            <span class="font-medium text-red-600 mt-2">{{ $errors->first('firstName') }}</span>
                        @endif

                    </div>
                    <div class="w-full">
                        <label for="lastName" class="block text-trueGray-400 font-semibold mb-2">Nume</label>
                        {{-- error zone --}}
                        <input type="text" id="lastName" name="lastName" value="{{ old('lastName', $user->last_name) }}"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                        @if ($errors->has('lastName'))
                            <div class="font-medium text-red-600">{{ $errors->first('lastName') }}</div>
                        @endif
                    </div>
                </div>

                <div class="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
                    <div class="w-full">
                        <label for="phoneNumber" class="block text-trueGray-400 font-semibold mb-2">Phone number</label>
                        {{-- error zone --}}
                        <input type="text" id="phoneNumber" name="phoneNumber"
                            value={{ old('phoneNumber', $user->phone_number) }}
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600" />
                        @if ($errors->has('phoneNumber'))
                            <div class="font-medium text-red-600">{{ $errors->first('phoneNumber') }}</div>
                        @endif
                    </div>
                    <div class="w-full">
                        <label for="email" class="block text-trueGray-400 font-semibold mb-2">Email</label>
                        {{-- error zone --}}
                        <input type="text" id="email" name="email" value="{{ $user->email }}"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                        @if ($errors->has('email'))
                            <div class="font-medium text-red-600">{{ $errors->first('email') }}</div>
                        @endif
                    </div>

                </div>

                <div class="w-full lg:text-right mt-4">
                    <button type="submit"
                        class="w-full lg:w-auto bg-green-600 hover:bg-green-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
                        Actualizeaza
                    </button>
                </div>
            </form>
        </div>

        
        <div>
            <h2 class="mt-8 mb-4 pl-1 text-3xl font-semibold text-trueGray-300">Securitate</h2>
            <form method="POST" action="{{ route('account.password.update') }}" class="text-sm">
                @csrf
                @method('PUT')

                <div class="w-full">
                    <label for="currentPassword" class="block text-trueGray-400 font-semibold mb-2">Current password</label>
                    {{-- error zone --}}
                    <input type="password" id="currentPassword" name="currentPassword"
                        class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600" />
                    @if ($errors->has('currentPassword'))
                        <div class="font-medium text-red-600">{{ $errors->first('currentPassword') }}</div>
                    @endif
                </div>

                <div class="flex flex-col gap-4 mt-2 md:flex-row md:items-center">
                    <div class="w-full">
                        <label for="password" class="block text-trueGray-400 font-semibold mb-2">Password</label>
                        {{-- error zone --}}
                        <input type="password" id="password" name="password"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600" />
                        @if ($errors->has('password'))
                            <div class="font-medium text-red-600">{{ $errors->first('password') }}</div>
                        @endif
                    </div>
                    <div class="w-full">
                        <label for="repeatPassword" class="block text-trueGray-400 font-semibold mb-2">Repeat
                            password</label>
                        {{-- error zone --}}
                        <input type="password" id="repeatPassword" name="password_confirmation"
                            class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600">
                    </div>
                </div>

                <div class="w-full lg:text-right mt-4">
                    <button type="submit"
                        class="w-full lg:w-auto bg-green-600 hover:bg-green-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">
                        Actualizeaza parola
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
