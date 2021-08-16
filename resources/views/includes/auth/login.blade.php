<form id="loginForm" method="POST" action="{{ route('login') }}" class="modal" autocomplete="off">
	@csrf

	<!-- Email Address -->
	<div>
		<x-label for=" email" :value="__('Email')" />

		<x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />

		<!-- Password -->
		<div class="mt-4">
			<x-label for="password" :value="__('Password')" />

			<x-input id="password" class="block mt-1 w-full" type="password" name="password" required
				autocomplete="current-password" />
		</div>
	</div>

	<!-- Remember Me -->
	<div class="block mt-4">
		<label for="remember_me" class="inline-flex items-center">
			<input id="remember_me" type="checkbox"
				class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				name="remember">
			<span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
		</label>
	</div>

	<x-auth-validation-errors id="login-errors" class="mb-4" :errors="$errors" />

	<div class="flex items-center justify-end mt-4">
		<div class="flex flex-col">
			@if (Route::has('password.request'))
			<a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
				{{ __('Forgot your password?') }}
			</a>
			@endif
		</div>

		<x-button class="ml-3">
			{{ __('Log in') }}
		</x-button>
	</div>
</form>


@push('scripts')
<script>
	$('#loginForm').on($.modal.BEFORE_CLOSE, function(event, modal) {
		$('#loginForm *').filter(":input").not(':button').not('input[type=hidden]').each(function(index, input) {
				input.value = "";
		});

		$('#login-errors').html('')
	});
</script>

@if ($errors->has('email') || $errors->has('password'))
<script>
	$('#loginForm').modal({
		fadeDuration: 150,
		fadeDelay: 0.50
});
</script>
@endif

@endpush