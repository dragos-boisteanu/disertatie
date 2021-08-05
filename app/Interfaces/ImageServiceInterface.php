<?php

namespace App\Interfaces;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use React\Http\Io\UploadedFile as IoUploadedFile;

interface ImageServiceInterface
{
	public function storeImage(UploadedFile $image, string $storagePath, string $table, string $column, int $id): String;
	public function deleteImage(string $table, string $column, int $id, string $imagePath): void;
}
