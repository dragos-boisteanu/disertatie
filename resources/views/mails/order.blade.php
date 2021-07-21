<html>

<head>
  <title>Order created</title>
</head>

<body>
  <h1>Detalii comanda</h1>
  <ul style="list-style: none;">
    <li>
      <span style="font-weight: bold;">ID comanda:</span>
      <span>{{ $order->id }}</span>
    </li>
    <li>
      <span style="font-weight: bold;">Plasata la:</span>
      <span>{{ $order->created_at }}</span>
    </li>
    @isset($order->staff)
      <li style="padding-bottom: 0.5rem;">
        <span style="font-weight: bold;">Personal:</span>
        <span>{{ $order->staff->first_name }} {{ $order->staff->last_name }}</span>
      </li>
    @endisset
    <li>
      <span style="font-weight: bold;">Nume client:</span>
      @if(isset($order->client))
      <span>{{ $order->client->first_name }} {{ $order->client->last_name }}</span>
      @else
      <span>{{ $order->name }}</span>
      @endif
    </li>
    <li>
      <span style="font-weight: bold;">Adresa:</span>
      <span>{{ $order->address }}</span>
    </li>
    <li>
      <span style="font-weight: bold;">Numar telefon:</span>
      <span>{{ $order->phone_number }}</span>
    </li>
  </ul>
  <h2>Produse</h2>
  <table style="border: 1px solid black; border-collapse:collapse">
    <thead>
      <tr>
        <th style="text-align:center; padding: 8px; border: 1px solid black;">#</th>
        <th style="text-align:center; padding: 8px; border: 1px solid black;">Nume</th>
        <th style="text-align:center; padding: 8px; border: 1px solid black;">Cantitate</th>
        <th style="text-align:center; padding: 8px; border: 1px solid black;">
          <div>
            Pret pe bucata
          </div>
          <div>
            (include TVA + Discount)
          </div>
        </th>
        <th style="text-align:center; padding: 8px; border: 1px solid black;">Pret final</th>
      </tr>
    </thead>
    <tbody>
    @foreach($order->products as $product)
      <tr>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $loop->index+1  }}</td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $product->name }}</td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $product->pivot->quantity }}</td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $product->pivot->unit_price }} Ron </td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $product->pivot->quantity * $product->pivot->unit_price }} Ron</td>
      </tr>
      @endforeach
      
      <tr>
        <td style="text-align:center; padding: 8px; border: 1px solid black;"> {{ $order->products->count() + 1}}</td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $order->deliveryMethod->name}}</td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">1</td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $order->deliveryMethod->price }} Ron</td>
        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $order->deliveryMethod->price }} Ron</td>
      </tr>
      <tr>
        <td colspan="2" style="text-align:center; padding: 8px; font-weight: bold">
          TOTAL
        </td>
        <td style="padding: 8px; text-align: center; border: 1px solid black">{{ $order->totalQuantity }}</td>
        <td></td>
        <td style="padding: 8px; text-align:center; border: 1px solid;">{{ $order->totalValue }} Ron</td>
      </tr>
    </tbody>
  </table>

  @auth
    <div style="margin-top: 1rem;">
      <a href="{{ route('orders.show', ['id' => $order->id]) }}">Urmareste comanda</a>
    </div>
  @endauth
  <div style="margin-top: 1rem;">
    <span style="font-weight: bold;">Telefon contact:</span>
    <a href="tel:0238482384">0238482384</a>
  </div>
</body>

</html>