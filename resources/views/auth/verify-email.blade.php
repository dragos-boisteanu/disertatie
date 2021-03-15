<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <a href="/">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </a>
        </x-slot>

        <div class="mb-4 text-sm text-gray-600">
           Thanks for signing up! Before getting started, could you verify your email address  <span class="font-semibold">{{ $email }}</span> by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        @if (session('status') == 'verification-link-sent')
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ __('A new verification link has been sent to ')}} <span class="font-semibold">{{ $email }}</span>
            </div>
        @endif

 
        <div class="mt-4 flex flex-col items-center justify-center">
            <form method="POST" action="{{ route('verification.send') }}">
                @csrf

                <div class="flex">
                    {{-- <x-label for="email" :value="__('Wrong address ?')" /> --}}
                    <x-input id="email" class="block mt-1 w-full" type="email" name="email" placeholder="New email address"/>
                </div>

                <div class="mt-2 text-center">
                    <x-button>
                        {{ __('Resend Verification Email') }}
                    </x-button>
                </div>
            </form>

            <form method="POST" action="{{ route('logout') }}">
                @csrf

                <button type="submit" class="mt-4 underline text-sm text-gray-600 hover:text-gray-900">
                    {{ __('Log out') }}
                </button>
            </form>
        </div>
    </x-auth-card>
</x-guest-layout>
