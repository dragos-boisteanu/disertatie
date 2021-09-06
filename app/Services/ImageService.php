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
			DB::beginTransaction();

			$files = Storage::allFiles($storagePath);
			Storage::delete($files);

			$path = $image->store($storagePath);
			$path = '/storage/' . $path;

			DB::table($table)->where('id', $id)->update([$column => $path]);

			DB::commit();
			return $path;
		} catch (\Exception $e) {
			DB::rollBack();
			throw new Exception('Failed to save image, try again later');
		}
	}

	public function deleteImage(string $table, string $column, int $id, string $imagePath, ?string $defaultPath = null): void
	{
		try {
			DB::beginTransaction();

			DB::table($table)->where('id', $id)->update([$column => null]);

			if ($defaultPath) {
				DB::table($table)->where('id', $id)->update([$column => $defaultPath]);
			}

			DB::commit();
		} catch (\Exception $e) {
			DB::rollBack();
			debug($e);
			throw new ModelNotFoundException('Something went wrong, try again later');
		}
	}
}
