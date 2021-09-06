<?php

namespace App\Mail;

use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderStatusUpdateMail extends Mailable
{
	use Queueable, SerializesModels;

	private Order $order;
	private OrderStatus $oldStatus;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct(Order $order, OrderStatus $oldStatus)
	{
		$this->order = $order;
		$this->oldStatus = $oldStatus;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->subject("Starea comenzii #" . $this->order->id . ' a fost schimbata')->view('mails.orders.order-status', ['order' => $this->order, 'oldStatus' => $this->oldStatus]);
	}
}
