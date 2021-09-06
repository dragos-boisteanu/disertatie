<?php

namespace App\Http\Controllers\Api\Dashboard;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Interfaces\ImageServiceInterface;
use Illuminate\Auth\Access\AuthorizationException;

class CategoryImageController extends Controller
{
	private $imageService;

	public function __construct(ImageServiceInterface $imageService)
	{
		$this->imageService = $imageService;
	}


	public function store(Request $request, $id)
	{
		try {

			$this->authorize('update', Category::class);

			$storagePath = '/categories_images/' . $id;

			$path = $this->imageService->storeImage($request->file('image'), $storagePath, 'categories', 'image', intval($id));

			return response()->json(['imagePath' => $path], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (Exception $e) {
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}

	public function destroy(Request $request, $id)
	{
		try {
			$this->authorize('update', Category::class);

			DB::beginTransaction();

			$this->imageService->deleteImage('categories', 'image', $id, $request->imagePath, "");
			$storagePath = '/categories_images/' . $id;
			Storage::deleteDirectory($storagePath);

			DB::commit();
			return response()->json(['message' => 'Image removed'], 200);
		} catch (AuthorizationException $e) {
			return  response()->json(['message' => $e->getMessage()], 403);
		} catch (\Exception $e) {
			DB::rollBack();
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}
}
