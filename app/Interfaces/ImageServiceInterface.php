<?php

namespace App\Interfaces;

use Illuminate\Http\UploadedFile;

interface ImageServiceInterface
{
	public function storeImage(UploadedFile $image, string $storagePath, string $table, string $column, int $id): String;
	public function deleteImage(string $table, string $column, int $id, string $imagePath, ?string $defaultPath): void;
}
