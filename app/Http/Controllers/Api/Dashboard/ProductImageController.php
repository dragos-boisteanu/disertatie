<?php

namespace App\Http\Controllers\Api\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Interfaces\ImageServiceInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductImageController extends Controller
{

	private $imageService;

	public function __construct(ImageServiceInterface $imageService)
	{
		$this->imageService = $imageService;
	}

	public function store(Request $request, $id)
	{
		try {
			$storagePath = '/products_images/' . $id;

			$path = $this->imageService->storeImage($request->file('image'), $storagePath, 'products', 'image', $id);

			return response()->json(['imagePath' => $path], 200);
		} catch (\Exception $e) {
			return response()->json(['message' => $e->getTrace()], 500);
		}
	}

	public function destroy(Request $request, $id)
	{
		try {
			DB::beginTransaction();
			$this->imageService->deleteImage('products', 'image', $id, $request->imagePath);

			DB::commit();
			return response()->json(['message' => 'Image removed'], 200);
		} catch (\Exception $e) {
			DB::rollBack();
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}
}
