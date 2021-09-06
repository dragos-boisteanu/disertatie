<header id="top" class="flex-none bg-gray-900">

	<div id="backdrop" class="fixed top-0 left-0 z-10 bg-black bg-opacity-75 w-full h-screen" style="display: none"></div>

	<div class="w-full h-52">
		<img class="h-full w-full object-cover" src='{{ asset("/storage/header3.jpg")}}' />
	</div>

	<x-navigations.mobile :cart="$cart"></x-navigations.mobile>

	<x-navigations.desktop :cart="$cart"></x-navigations.desktop>

	<x-navigations.mobile-slider></x-navigations.mobile-slider>

	<div class="h-9 lg:hidden "></div>

	@auth
	<x-navigations.desktop-user></x-navigations.desktop-user>
	@endauth
	@guest
	<x-navigations.desktop-guest></x-navigations.desktop-guest>
	@endguest

	<x-mobile-cart :cart="$cart"></x-mobile-cart>

	@include('includes.auth.login')
	@include('includes.auth.register')
</header>

@push('scripts')
{{-- <script>
        new Splide('.splide', {
            type: 'loop',
            speed: 400,
            height: '250px',
            widht: 'full',
            rewind: true,
            arrows: false,
            pagination: false,
            autoplay: true
        }).mount();
    </script> --}}

<script>
	const mobileSlider = $('#mobileSlider');
	const backdrop = $('#backdrop');

	$('[data-auth]').each(function() {
		$(this).click(function() {
			backdrop.hide();
			mobileSlider.hide();
			$('#loginForm').modal({
				fadeDuration: 150,
				fadeDelay: 0.50
			})
		})
	});

	$('[data-register]').each(function() {
		$(this).click(function() {
			backdrop.hide();
			mobileSlider.hide();
			$('#registerForm').modal({
				fadeDuration: 150,
				fadeDelay: 0.50
			});
		})
	});

	backdrop.click(function() {
		mobileSlider.hide();
		backdrop.hide();
	})


	$('#mobileMenuBtn').click(function() {
		backdrop.show();
		mobileSlider.show();
	});
</script>


@endpush