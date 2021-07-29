<?php

namespace App\Listeners;

use App\Events\UserLogged;
use Illuminate\Support\Facades\Auth;
use App\Interfaces\CartServiceInterface;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class InitUserCart
{
    private $cartService;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(CartServiceInterface $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Handle the event.
     *
     * @param  UserLogged  $event
     * @return void
     */
    public function handle(UserLogged $event)
    {

        // check if user has a cart

        // check if the current session has a cart
        // if it does check if the car has items

        // copy items from session cart to user cart
        // keep the old items
        // if the item already exists don't copy it

        $sessionId = $event->sesionIdBeforLogin;
        $userCart = $this->cartService->getCart($event->userId, $sessionId);

        $sessionCart = $this->cartService->getCart(null, $sessionId);
        
        if (isset($userCart) && isset($sessionCart) && $sessionCart->items->count() > 0) {
            foreach ($sessionCart->items as $item) {
                //collect all inserted record IDs
                $sessionCartItemsArray[$item->id] = ['quantity' => $item->pivot->quantity];
            }

            $userCart->items()->sync($sessionCartItemsArray, false);
        }

    }
}
