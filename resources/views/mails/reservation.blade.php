<html>

<head>
    <title>Rezervarea # {{ $reservation->id }} a fost inregistrata</title>
</head>

<body>
    <h1>Detalii rezervare</h1>

    <ul style="list-style: none;">
        <li>
            <span style="font-weight: bold;">ID rezervare:</span>
            <span>#{{ $reservation->id }}</span>
        </li>
        <li>
            <span style="font-weight: bold;">Plasata la:</span>
            <span>{{ $reservation->created_at }}</span>
        </li>
        <li>
            <span style="font-weight: bold;">Disponibila incepand cu:</span>
            <span> {{ Carbon\Carbon::createFromDate($reservation->begins_at)->addMinutes(30) }}</span>
        </li>
        @isset($reservation->staff)
            <li style="padding-bottom: 0.5rem;">
                <span style="font-weight: bold;">Personal:</span>
                <span>{{ $reservation->staff->first_name }} {{ $reservation->staff->last_name }}</span>
            </li>
        @endisset
        <li>
            <span style="font-weight: bold;">Nume client:</span>
            <span>{{ $reservation->client->first_name }} {{ $reservation->client->last_name }}</span>
        </li>
        <li>
            <span style="display:inline-block; font-weight: bold;">Mese:</span>
            <ul style="display:inline-block; list-style: none; padding: 0;">
                @foreach ($reservation->tables as $table)
                    <li style="display:inline-block; margin: 0 2px 0 0 ">{{ $table->name }} @if ($reservation->tables->count() > 0 && !$loop->last), @endif
                    </li>
                @endforeach
            </ul>
        </li>
        <li>
            <span style="font-weight: bold;">Telefon contact:</span>
            <span>{{ $reservation->phone_number }}</span>
        </li>
    </ul>

    @if ($reservation->products->count() > 0)
        <h2>Produse comandate</h2>
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
                @foreach ($reservation->products as $product)
                    <tr>
                        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $loop->index + 1 }}
                        </td>
                        <td style="text-align:center; padding: 8px; border: 1px solid black;">{{ $product->name }}
                        </td>
                        <td style="text-align:center; padding: 8px; border: 1px solid black;">
                            {{ $product->pivot->quantity }}</td>
                        <td style="text-align:center; padding: 8px; border: 1px solid black;">
                            {{ $product->pivot->unit_price }} Ron </td>
                        <td style="text-align:center; padding: 8px; border: 1px solid black;">
                            {{ $product->pivot->quantity * $product->pivot->unit_price }} Ron</td>
                    </tr>
                @endforeach
               
                <tr>
                    <td colspan="2" style="text-align:center; padding: 8px; font-weight: bold">
                        TOTAL
                    </td>
                    <td style="padding: 8px; text-align: center; border: 1px solid black">{{ $reservation->totalQuantity }}
                    </td>
                    <td></td>
                    <td style="padding: 8px; text-align:center; border: 1px solid;">{{ $reservation->totalValue }} Ron</td>
                </tr>
            </tbody>
        </table>

    @endif
</body>

</html>
