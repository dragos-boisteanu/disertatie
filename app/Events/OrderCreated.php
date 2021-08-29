<?php

namespace App\Events;

use App\Http\Resources\OrderList;
use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderCreated implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $order;
	public $queue = 'ws';
	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct(Order $order)
	{
		$this->order = new OrderList($order);
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn()
	{
		return new PrivateChannel('orders');
	}
}
