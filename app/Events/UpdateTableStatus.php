<?php

namespace App\Events;

use App\Models\TableStatus;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateTableStatus implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	public $tableStatus;
	public $tableId;
	public $queue = 'ws';
	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct(TableStatus $tableStatus, int $tableId)
	{
		$this->tableStatus = $tableStatus;
		$this->tableId = $tableId;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn()
	{
		return new PrivateChannel('tables');
	}

	public function broadcastWith()
	{
		return [
			'id' => $this->tableId,
			'status' => [
				'id' => $this->tableStatus->id,
				'name' => $this->tableStatus->name
			]
		];
	}
}
