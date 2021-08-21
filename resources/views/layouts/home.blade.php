<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-screen">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>{{ $title ?? 'Store' }}</title>

	<!-- Fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

	<!-- Styles -->
	<link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.css">

	<!-- Scripts -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
		integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.js">
	</script>

</head>

<body class="h-full">
	{!! Toastr::message() !!}
	<div id="store-app" class="h-full flex flex-col">
		@include('includes.header')
		<main class="relative flex-1 bg-gray-800 p-4 w-full">
			@yield('content')
			<x-to-top></x-to-top>
		</main>
		@include('includes.footer')
	</div>
</body>
<script src="{{ asset(mix('js/app.js')) }}"></script>
<script>
	const toTopLink = $('#toTop');

	$(window).scroll(function(){
		if($(this).scrollTop() > 200) {
			toTopLink.addClass('!opacity-100');
		} else {
			toTopLink.removeClass('!opacity-100');
		}
	});
</script>
@stack('scripts')

</html>