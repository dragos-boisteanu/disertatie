<html>
<head>
	<title>Order created</title>
</head>
<body>
<p><strong>Your order was created. ID: {{ $order->id }}</strong></p>
<p>Order items</p>
<ul>
  @foreach ($order->products as $product)
    <li>
      {{ $product->name }}
    </li>
   @endforeach
</ul>

</body>
</html>