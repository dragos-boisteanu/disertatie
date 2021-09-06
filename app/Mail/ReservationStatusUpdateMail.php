<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationStatusUpdateMail extends Mailable
{
	use Queueable, SerializesModels;

	protected $reservation;
	protected $oldStatus;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct($reservation, $oldStatus)
	{
		$this->reservation = $reservation;
		$this->oldStatus = $oldStatus;
	}
	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return  $this->subject("Starea rezervarii cu id-ul #" . $this->reservation->id . ' a fost schimbat')->view('mails.reservations.reservation-status', ['reservation' => $this->reservation, 'oldStatus' => $this->oldStatus]);
	}
}
