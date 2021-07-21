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
              @foreach($reservation->tables as $table ) 
                <li style="display:inline-block; margin: 0 2px 0 0 ">{{ $table->name }} @if($reservations->tables->count() > 0 && !$loop->last), @endif </li>
              @endforeach
            </ul>
        </li>
        <li>
            <span style="font-weight: bold;">Telefon contact:</span>
            <span>{{ $reservation->phone_number }}</span>
        </li>
    </ul>
</body>

</html>
