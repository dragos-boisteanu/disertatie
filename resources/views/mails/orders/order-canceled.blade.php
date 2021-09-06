<html>

<head>
	<title>Order canceled</title>
</head>

<body>
	<div>
		Comanda cu id-ul <span style="font-weight: bold">#{{ $order->id }}</span> a fost anulata.
	</div>

	@if(Auth::check())
	<div style="margin-top: 8px">
		Comanda este pastrata in istoric, aceasta poate fi accesata <a
			href="{{ route('order.show', ['id'=>$order->id]) }}">AICI</a>
	</div>
	@endif
</body>

</html>