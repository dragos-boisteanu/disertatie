<?php

namespace App\Jobs\Orders;

use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Bus\Queueable;
use App\Mail\OrderStatusUpdateMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class OrderStatusUpdatedJob implements ShouldQueue
{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	protected Order $order;
	protected OrderStatus $oldStatus;
	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct(Order $order, OrderStatus $oldStatus)
	{
		$this->order = $order;
		$this->oldStatus = $oldStatus;
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		$mail = new OrderStatusUpdateMail($this->order, $this->oldStatus);
		Mail::to($this->order->email)->send($mail);
	}
}
