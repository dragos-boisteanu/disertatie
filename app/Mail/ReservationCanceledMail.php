<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ReservationCanceledMail extends Mailable
{
	use Queueable, SerializesModels;

	protected $reservation;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct(Reservation $reservation)
	{
		$this->reservation = $reservation;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->subject("Rezervarea cu id-ul #" . $this->reservation->id .  " a fost anulata")->view('mails.reservations.reservation-canceled', ['reservation' => $this->reservation]);
	}
}
