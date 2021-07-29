<?php

use App\Broadcasting\OrderChannel;
use App\Broadcasting\OrdersChannel;
use App\Broadcasting\TablesChannel;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('orders.{orderId}', OrderChannel::class);

Broadcast::channel('orders', OrdersChannel::class);
Broadcast::channel('tables', TablesChannel::class);