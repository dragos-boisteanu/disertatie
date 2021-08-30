<html>

<head>
	<title>Order status updated</title>
</head>

<body>
	<div>
		Statutul comenzii {{ $order->id }} s-a schimbat din <span style="font-weight: 400">{{ $oldStatus }}</span> in <span
			style="font-weight: 400">{{ $order->status->name}}</span>.
	</div>

	@if(Auth::check())
	<div style="margin-top: 8px">
		Comanda poate fi urmarita <a href="{{ route('order.show', ['id'=>$order->id]) }}">AICI</a>
	</div>
	@endif
</body>

</html>