<form id="registerForm" method="POST" action="{{ route('register') }}" class="modal">
    @csrf

    <div>
        <x-label for="firstName" :value="__('First name')" />

        <x-input id="firstName" class="block mt-1 w-full" type="text" name="first_name" :value="old('first_name')"
            required autofocus />
    </div>

    <div class="mt-4">
        <x-label for="lastName" :value="__('Last name')" />

        <x-input id="lastName" class="block mt-1 w-full" type="text" name="last_name" :value="old('last_name')" required
            autofocus />
    </div>

    <div class="mt-4">
        <x-label for="phoneNumber" :value="__('Phone number')" />

        <x-input id="phoneNumber" class="block mt-1 w-full" type="text" name="phone_number" :value="old('phone_number')"
            required autofocus />
    </div>


    <div class="mt-4">
        <x-label for="email" :value="__('Email')" />

        <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required />
    </div>


    <div class="mt-4">
        <x-label for="password" :value="__('Password')" />

        <x-input id="password" class="block mt-1 w-full" type="password" name="password" required
            autocomplete="new-password" />
    </div>


    <div class="mt-4">
        <x-label for="password_confirmation" :value="__('Confirm Password')" />

        <x-input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation"
            required />
    </div>

    <div class="flex items-center justify-end mt-4">
        <x-button class="ml-4">
            {{ __('Register') }}
        </x-button>
    </div>
</form>


@push('scripts')
    @guest
        <script>
            $('#register').click(function() {
                $('#registerForm').modal({
                    fadeDuration: 150,
                    fadeDelay: 0.50
                });
            })
        </script>
    @endguest
@endpush
