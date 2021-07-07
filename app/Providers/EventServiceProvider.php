<?php

namespace App\Providers;

use App\Events\AccountCreated;
use App\Events\EmailUpdated;
use App\Events\UserLogged;
use App\Listeners\InitUserCart;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use App\Listeners\SendPasswordResetLink;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        UserLogged::class => [
            InitUserCart::class,
        ],

        AccountCreated::class => [
            SendPasswordResetLink::class
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
