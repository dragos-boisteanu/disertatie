<?php


namespace App\Services;

use Exception;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use App\Interfaces\CartServiceInterface;
use App\Interfaces\ImageServiceInterface;
use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ImageService implements ImageServiceInterface
{

	public function storeImage(UploadedFile $image, string $storagePath, string $table, string $column, int $id): string
	{
		try {
			$files =  Storage::allFiles($storagePath);
			Storage::delete($files);

			$path = $image->store($storagePath);
			$path = '/storage/' . $path;

			DB::table($table)->where('id', $id)->update([$column => $path]);

			return $path;
		} catch (\Exception $e) {
			throw new Exception('Something went wrong, try again later');
		}
	}

	public function deleteImage(string $table, string $column, int $id, string $imagePath): void
	{
		try {
			DB::beginTransaction();

			// $model = DB::table($table)->select($column)->where('id', $id)->first();

			// if (!isset($model)) {
			// 	throw new ModelNotFoundException();
			// }

			DB::table($table)->where('id', $id)->update([$column => null]);
			Storage::delete($imagePath);

			DB::commit();
		} catch (ModelNotFoundException $e) {
			DB::rollBack();
			throw new ModelNotFoundException('Not found');
		} catch (\Exception $e) {
			DB::rollBack();
			throw new ModelNotFoundException('Something went wrong, try again later');
		}
	}
}
