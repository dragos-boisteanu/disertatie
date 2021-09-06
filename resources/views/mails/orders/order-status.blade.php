<html>

<head>
	<title>Order status updated</title>
</head>

<body>
	<div>
		Starea comenzii <span style="font-weight: bold">#{{ $order->id }}</span> a fost schimbata din <span
			style="font-weight: bold">{{ $oldStatus->name }}</span>
		in
		<span style="font-weight: bold">{{ $order->status->name}}</span> de catre {{ $order->staff->fullName}}
	</div>

	@if(Auth::check())
	<div style="margin-top: 8px">
		Comanda poate fi urmarita <a href="{{ route('order.show', ['id'=>$order->id]) }}">AICI</a>
	</div>
	@endif
</body>

</html>