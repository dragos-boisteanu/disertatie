<html>

<head>
	<title>Reservation status updated</title>
</head>

<body>
	<div>
		Starea rezervarii <span style="font-weight: bold">#{{ $reservation->id }}</span> a fost schimbata din
		<span style="font-weight: bold">{{ $oldStatus->name }}</span>
		in
		<span style="font-weight: bold">{{ $reservation->status->name}}</span>
		de catre {{ $reservation->staff->fullName}}
	</div>

	@auth
	<div style="margin-top: 8px">
		Detalii despre rezervare poat fi vazute <a href="{{ route('reservation.show', ['id'=>$reservation->id]) }}">AICI</a>
	</div>
	@endauth
</body>

</html>