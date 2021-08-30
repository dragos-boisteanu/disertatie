<html>

<head>
	<title>Order canceled</title>
</head>

<body>
	<div>
		Rezervarea cu id-ul <span style="font-weight: bold">#{{ $reservation->id }}</span> a fost anulata.
	</div>

	@if(Auth::check())
	<div style="margin-top: 8px">
		Rezervarea este pastrata in istoric, aceasta poate fi accesata <a
			href="{{ route('order.show', ['id'=>$reservation->id]) }}">AICI</a>
	</div>
	@endif
</body>

</html>