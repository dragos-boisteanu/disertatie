<?php

namespace App\Http\Controllers\Api\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\FileStoreRequest;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(FileStoreRequest $request) 
    {
        if($request->hasFile('image')) {
            $path = $request->file('image')->store('temp');
            return $path;
        }
    }

    public function show()
    {

    }

    public function destroy(Request $request, $image) 
    {

        $image = $request->getContent();
        Storage::disk('local')->delete($image);

        return response()->json(['message'=>'File deleted'], 200);
    }
}
