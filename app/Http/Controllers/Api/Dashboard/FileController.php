<?php

namespace App\Http\Controllers\Api\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use App\Http\Requests\FileStoreRequest;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(FileStoreRequest $request) 
    {
        if($request->hasFile('image')) {
            $file = $request->file('image');
            if($file->extension() === 'jpg' || $file->extension() === 'png') {
                $img = Image::make($file)->resize(128,128)->encode('jpg', 100);

                if(Storage::put('temp/'.$file->hashName(), $img)) {
                    $path = 'temp/'.$file->hashName();
                };
               
            } else {
                $path = $request->file('image')->store('temp');
            }   
            
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
