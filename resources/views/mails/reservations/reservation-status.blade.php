<html>

<head>
	<title>Reservation status updated</title>
</head>

<body>
	<div>
		Statutul rezervarii {{ $reservation->id }} s-a schimbat din <span style="font-weight: 400">{{ $oldStatus }}</span>
		in <span style="font-weight: 400">{{ $reservation->status->name}}</span>.
	</div>

	@auth
	<div style="margin-top: 8px">
		Detalii despre rezervare poat fi vazute <a href="{{ route('reservation.show', ['id'=>$reservation->id]) }}">AICI</a>
	</div>
	@endauth
</body>

</html>