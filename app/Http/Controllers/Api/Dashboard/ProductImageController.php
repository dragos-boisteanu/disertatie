<?php

namespace App\Http\Controllers\Api\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductImageController extends Controller
{
	public function store(Request $request, $id)
	{
		try {
			$storagePath = '/products_images' . '/' . $id;
			$files =  Storage::allFiles($storagePath);
			Storage::delete($files);

			$path = $request->file('image')->store($storagePath);
			$path = '/storage/' . $path;

			DB::table('products')->where('id', $id)->update(['image' => $path]);

			return response()->json(['imagePath' => $path], 200);
		} catch (\Exception $e) {
			debug($e);
			return response()->json(['message' => $e->getTrace()], 500);
		}
	}

	public function destroy($id)
	{
		try {
			DB::beginTransaction();

			$product = DB::table('products')->select('image')->where('id', $id)->first();

			if (!isset($product)) {
				throw new ModelNotFoundException();
			}

			DB::table('products')->where('id', $id)->update(['image' => null]);
			Storage::delete($product->image);

			DB::commit();

			return response()->json(['message' => 'Image removed'], 200);
		} catch (ModelNotFoundException $e) {
			DB::rollBack();
			debug($e);
			return response()->json(['message' => 'Product not found'], 500);
		} catch (\Exception $e) {
			DB::rollBack();
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}
}
