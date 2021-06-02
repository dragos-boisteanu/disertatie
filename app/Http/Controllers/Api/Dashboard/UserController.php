<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\User;
use App\Models\Address;
use Illuminate\Support\Str;
use App\Events\EmailUpdated;
use Illuminate\Http\Request;
use Intervention\Image\Image;
use App\Events\AccountCreated;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\ClientResource;
use App\Http\Resources\UserCollection;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\UserPatchRequest;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\User as ResourcesUser;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = User::filter($request->all());

        if(!$request->has('orderBy')) {
            $orderByValue = 14;
        } else {
            $orderByValue = $request->orderBy;
        }

      
        switch($orderByValue) {
            case 1:
                $query->orderBy('last_name', 'asc');
                break;
            case 2: 
                $query->orderBy('last_name', 'desc');
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

        $query->orderBy('id', 'asc');
        
        $users = $query->withTrashed()->paginate(2);

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
        $request->user()->can('create');
        
        try {
            DB::beginTransaction();

            $user = new User();

            $user->first_name = $request->firstName;
            $user->last_name = $request->lastName;
            $user->phone_number = $request->phoneNumber;
            $user->email = $request->email;
            $user->role_id = $request->roleId;
            $user->password = Hash::make(Str::random(18));
    
            if($request->has('address')) {
                $addressInputData['address'] = $request->address;
                $addressInputData['user_id'] = $user->id;
                
                Address::create($addressInputData); 
            }

            if($request->has('avatar')) {
                $requestPath = $request->avatar;
                $extension = pathinfo(storage_path($requestPath), PATHINFO_EXTENSION);
                $filename = 'avatar_'.$user->id . '_' . now()->timestamp;
                $newPath = '/public/avatars/' . $user->id . '/' . $filename . '.' . $extension;

                Storage::move($requestPath, $newPath);

                $dbPath = '/storage/avatars/'. $user->id . '/' . $filename . '.' . $extension;
                $user->avatar = $dbPath;
                $user->save();

                Storage::delete($requestPath);
            }

            // event(new AccountCreated($user));
            DB::commit();

            return response()->json(['user' => ['id'=>$user->id, 'craetedAt'=>$user->created_at]], 201);
           
        } catch (\Illuminate\Database\QueryException $ex) {
            DB::rollBack();
            return response()->json($ex->getMessage(), 500);
        } catch( \Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::withTrashed()->findOrFail($id);

        return new ResourcesUser($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserPatchRequest $request, $id)
    {
        $user = User::withTrashed()->findOrFail($id);

        $request->user()->can('update', $user);

        if($request->has('avatar')) {
            $user->avatar = $request->avatar;
        }

        if($request->has('firstName')) {
            $user->first_name = $request->firstName;
        }

        if($request->has('lastName')) {
            $user->last_name = $request->lastName;
        }

        if($request->has('phoneNumber')) {
            $user->phone_number = $request->phoneNumber;
        }

        if($request->has('email')) {
            $user->email = $request->email;
        }

        if($request->has('role.id')) {
            $user->role_id = $request->input('role.id');
        }



        if($request->has('email')) {
            $user->email_verified_at = null;  
            event( new Registered($user));
        }

        if($request->has('avatar')) {

            if($request->avatar !== 'clear') {
                $requestPath = $request->avatar;
                $extension = pathinfo(storage_path($requestPath), PATHINFO_EXTENSION);
    
                Storage::deleteDirectory('/public/avatars/' . $user->id );
    
                $filename = 'avatar_'.$user->id . '_' . now()->timestamp;
                $newPath = '/public/avatars/' . $user->id . '/' . $filename . '.' . $extension;
    
                Storage::move($requestPath, $newPath);
    
                $dbPath = '/storage/avatars/'. $user->id . '/' . $filename . '.' . $extension;
    
                $user->avatar = $dbPath;
    
                Storage::delete($requestPath);

                $user->save();

                return response()->json(['avatar'=> $user->avatar], 200);
            } else {
                Storage::deleteDirectory('/public/avatars/' . $user->id );
            
                $user->avatar = null;
            }
            
        }

        $user->save();

        return response()->json(null, 200);    
       
    }


    public function disable(Request $request, $id) 
    {
        $user = User::findOrFail($id);

        $request->user()->can('delete', $user);

        $user->delete();

        $user->refresh();

        return response()->json(['message'=>'User account disabled', 'deletedAt'=>$user->deleted_at ], 200);
    }

    public function restore(Request $request, $id) 
    {
        $user = User::withTrashed()->findOrFail($id);

        $request->user()->can('restore', $user);

        $user->restore();

        $user->refresh();

        return response()->json(['message'=>'User account restored', 'deletedAt'=>$user->deleted_at], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = User::withTrashed()->findOrFail($id);

        $request->user()->can('forceDelete', $user);

        $user->forceDelete();

        return response()->json(['message'=>'User account deleted'], 200);

    }

    public function getLoggedUser(Request $request) {
        return new UserResource($request->user());
    }

    
}
