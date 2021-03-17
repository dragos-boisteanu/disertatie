<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserCollection;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\UserStoreRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = User::filter($request);

        if(!isset($request->orderBy)) {
            $orderByValue = 14;
        } else {
            $orderByValue = $request->orderBy;
        }

        $query->orderBy('id', 'desc');
        
        switch($orderByValue) {
            case 1:
                $query->orderBy('name', 'asc');
                break;
            case 2: 
                $query->orderBy('name', 'desc');
                break;
            case 3:
                $query->orderBy('first_name', 'asc');
                break;
            case 4:
                $query->orderBy('first_name', 'desc');
                break;
            case 5:
                $query->orderBy('email', 'asc');
                break;
            case 6:
                $query->orderBy('emal', 'desc');
                break;
            case 7:        
                $query->orderBy('role_id', 'asc');
                break;
            case 8:
                $query->orderBy('role_id', 'desc');
                break;
            // TO DO: special order by for orders and reservations count
            // case 9:
            //     $query->orderBy('orders', 'asc');
            //     break;
            // case 10:
            //     $query->orderBy('orders', 'desc');
            //     break;
            // case 11:
            //     $query->orderBy('reservations', 'asc');
            //     break;
            // case 12:
            //     $query->orderBy('reservations', 'desc');
            //     break;
            case 13:
                $query->orderBy('created_at', 'asc');
                break;
            case 14:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $users = $query->with('role')->simplePaginate(5);

        return new UserCollection($users);
    }

   
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStoreRequest $request)
    {
        $input = $request->user;

        $input['password'] = Hash::make(Str::random(8));
        
        $user = User::create($input);

        event(new Registered($user));
        return ['id'=>$user->id, 'createdAt'=>$user->created_at];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return 'test';
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
