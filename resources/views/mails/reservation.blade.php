<html>

<head>
	<title>Rezervarea # {{ $reservation->id }} a fost inregistrata</title>
</head>

<body>
	<h1>Detalii rezervare</h1>
	<ul style="list-style: none; padding-left: 0">
		<li>
			<span style="font-weight: bold;">ID rezervare:</span>
			<span>#{{ $reservation->id }}</span>
		</li>
		<li style="margin-top: 8px;">
			<span style="font-weight: bold;">Plasata la:</span>
			<span>{{ $reservation->created_at }}</span>
		</li>
		<li style="margin-top: 8px;">
			<span style="font-weight: bold;">Disponibila incepand cu:</span>
			<span> {{ Carbon\Carbon::createFromDate($reservation->begins_at)->addMinutes(30) }}</span>
		</li>
		@isset($reservation->staff)
		<li style="margin-top: 8px;">
			<span style="font-weight: bold;">Personal:</span>
			<span>{{ $reservation->staff->first_name }} {{ $reservation->staff->last_name }}</span>
		</li>
		@endisset
		<li style="margin-top: 8px;">
			<span style="font-weight: bold;">Nume client:</span>
			<span>{{ $reservation->client->first_name }} {{ $reservation->client->last_name }}</span>
		</li>
		<li style="margin-top: 8px;">
			<span style="display:inline-block; font-weight: bold;">Mese:</span>
			<ul style="display:inline-block; list-style: none; padding: 0;">
				@foreach ($reservation->tables as $table)
				<li style="display:inline-block; margin: 0 2px 0 0 ">{{ $table->name }} @if ($reservation->tables->count() > 0
					&& !$loop->last), @endif
				</li>
				@endforeach
			</ul>
		</li>
		<li style="margin-top: 8px;">
			<span style="font-weight: bold;">Telefon contact:</span>
			<span>{{ $reservation->phone_number }}</span>
		</li>
	</ul>

	<div style="margin-top: 8px;">
		Urmareste starea rezervarii <a href="{{ route('reservations.show', ['reservation' => $reservation->id]) }}">aici</a>
	</div>

</body>

</html>