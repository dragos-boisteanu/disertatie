<html>

<head>
  <title>Order created</title>
</head>

<body>
  <h1>Your order was created.</h1>
  <ul style="list-style: none;">
    <li>
      <span style="font-weight: bold;">ID:</span>
      <span>{{ $order->id }}</span>
    </li>
    <li>
      <span style="font-weight: bold;">Address:</span>
      <span>{{ $order->address }}</span>
    </li>
    <li>
      <span style="font-weight: bold;">Phone number:</span>
      <span>{{ $order->phone_number }}</span>
    </li>
    <li>
      <span style="font-weight: bold;">Created at:</span>
      <span>{{ $order->created_at }}</span>
    </li>
    <li>
      <span style="font-weight: bold;">Waiter:</span>
      <span>{{ $order->staff->first_name }} {{ $order->staff->last_name }}</span>
    </li>
  </ul>
  <h2>Order items</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>
          <div>
            Unit Price
          </div>
          <div>
            (includes VAT + Discount)
          </div>
        </th>
        <th>Total Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    @foreach($order->products as $product)
      <tr>
        <td>{{ $loop->index+1  }}</td>
        <td>{{ $product->name }}</td>
        <td>{{ $product->pivot->quantity }}</td>
        <td>{{ $product->pivot->unit_price }} Ron </td>
        <td>{{ $product->pivot->quantity * $product->pivot->unit_price }} Ron</td>
      </tr>
      @endforeach
      
      <tr>
        <td> {{ $order->products->count() + 1}}</td>
        <td>{{ $order->deliveryMethod->name}}</td>
        <td>1</td>
        <td>{{ $order->deliveryMethod->price }} Ron</td>
        <td>{{ $order->deliveryMethod->price }} Ron</td>
      </tr>
      <tr>
        <td style="font-weight: bold">
          TOTAL
        </td>
        <td></td>
        <td style="text-align: center;">{{ $order->totalQuantity }}</td>
        <td></td>
        <td>{{ $order->totalValue }} Ron</td>
      </tr>
    </tbody>
  </table>
  <div>
    <a href="/">Track your order here</a>
  </div>
  <div>
    <span style="font-weight: bold;">Contact phone number</span>
    <span>0238482384</span>
  </div>
</body>

</html>