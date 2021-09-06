<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>{{ config('app.name', 'Laravel') }}</title>

	<!-- Fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

	<!-- Styles -->
	<link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">

	<!-- Scripts -->
	<script src="{{ mix('js/dashboard/app.js') }}" defer></script>
</head>

<body class="antialiased h-screen">
	<noscript>
		<strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
			Please enable it to continue.</strong>
	</noscript>
	<div id="app"></div>
</body>

</html>