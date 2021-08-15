<form id="registerForm" class="modal" autocomplete="off">
	@csrf

	<div>
		<x-label for="firstName" :value="__('First name')" />

		<x-input id="firstName" class="block mt-1 w-full" type="text" name="first_name" :value="old('first_name')" required
			autofocus />
		<div id="firstNameError" class="font-medium text-red-600"></div>
	</div>

	<div class="mt-4">
		<x-label for="lastName" :value="__('Last name')" />

		<x-input id="lastName" class="block mt-1 w-full" type="text" name="last_name" :value="old('last_name')" required
			autofocus />
		<div id="lastNameError" class="font-medium text-red-600"></div>
	</div>

	<div class="mt-4">
		<x-label for="phoneNumber" :value="__('Phone number')" />

		<x-input id="phoneNumber" class="block mt-1 w-full" type="text" name="phone_number" :value="old('phone_number')"
			required autofocus />
		<div id="phoneNumberError" class="font-medium text-red-600"></div>
	</div>

	<div class="mt-4">
		<x-label for="email" :value="__('Email')" />

		<x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required />
		<div id="emailError" class="font-medium text-red-600"></div>
	</div>


	<div class="mt-4">
		<x-label for="password" :value="__('Password')" />

		<x-input id="password" class="block mt-1 w-full" type="password" name="password" required
			autocomplete="new-password" />
		<div id="passwordError" class="font-medium text-red-600"></div>
	</div>


	<div class="mt-4">
		<x-label for="password_confirmation" :value="__('Confirm Password')" />

		<x-input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation"
			required />
		<div id="password_confirmationError" class="font-medium text-red-600"></div>
	</div>

	<div class="flex items-center justify-end mt-4">
		<x-button class="ml-4">
			{{ __('Register') }}
		</x-button>
	</div>
</form>


@push('scripts')

<script>
	const registerForm = $('#registerForm');

        registerForm.on($.modal.BEFORE_CLOSE, function(event, modal) {
            $('#registerForm *').filter(":input").not(':button').not('input[type=hidden]').each(function(index,
                input) {
                input.value = "";
            });
        });

        registerForm.submit(function(event) {
            event.preventDefault();

            let formData = $(this).serializeArray();

            $.ajax({
                method: "POST",
                headers: {
                    Accept: "application/json"
                },
                url: "{{ route('register') }}",
                data: formData,
                success: () => {
                    // window.location.assign("{{ route('home') }}")
                    $.modal.close();
                    toastr.success(
                        'Inregistrarea reusita. Verifica email-ul pentru confirmarea contului',
                        'Success');
                },
                error: (response) => {
                    if (response.status === 422) {
                        let errors = response.responseJSON.errors;
                        Object.keys(errors).forEach(function(key) {
                            console.log(key)
                            $("#registerForm #" + key).addClass("border-red-500");
                            $("#registerForm #" + key + "Error").text(errors[key][0]);
                        });
                    } else {
                        window.location.reload();
                    }
                }
            })
        })
</script>

@endpush