<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;

class ClientController extends Controller
{
    public function getClientByPhoneNumer($phoneNumber)
    {
        $client = User::where('phone_number', $phoneNumber)->firstOrFail();

        // if(empty($client)) {
        //     abort(404);
        // }

        return new ClientResource($client);
    }

    public function getClientAddresses($clientId) 
    {
        $client = User::with('addresses')->findOrFail($clientId);

        return new ClientResource($client);
    }
}
