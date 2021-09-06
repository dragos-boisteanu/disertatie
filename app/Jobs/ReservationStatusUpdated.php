<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use App\Mail\ReservationStatusUpdateMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ReservationStatusUpdated implements ShouldQueue
{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	protected $reservation;
	protected $oldStatus;

	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct($reservation, $oldStatus)
	{
		$this->reservation = $reservation;
		$this->oldStatus = $oldStatus;
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{

		$email = new ReservationStatusUpdateMail($this->reservation, $this->oldStatus);
		Mail::to($this->reservation->email)->send($email);
	}
}
