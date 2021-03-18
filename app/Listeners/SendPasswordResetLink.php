<?php

namespace App\Listeners;

use App\Events\AccountCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Password;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendPasswordResetLink
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AccountCreated  $event
     * @return void
     */
    public function handle(AccountCreated $event)
    {
        Password::sendResetLink(['email'=>$event->user->email]);
    }
}
