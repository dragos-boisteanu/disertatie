<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('tables')->insert([
			'name' => 'T1',
			'status_id' => 1,
			'seats' => 6
		]);

		DB::table('tables')->insert([
			'name' => 'T2',
			'status_id' => 1,
			'seats' => 4
		]);

		DB::table('tables')->insert([
			'name' => 'T3',
			'status_id' => 1,
			'seats' => 3
		]);

		DB::table('tables')->insert([
			'name' => 'T4',
			'status_id' => 1,
			'seats' => 2
		]);

		DB::table('tables')->insert([
			'name' => 'T5',
			'status_id' => 1,
			'seats' => 4,
		]);

		DB::table('tables')->insert([
			'name' => 'T6',
			'status_id' => 1,
			'seats' => 4
		]);

		DB::table('tables')->insert([
			'name' => 'T7',
			'status_id' => 1,
			'seats' => 2
		]);

		DB::table('tables')->insert([
			'name' => 'T8',
			'status_id' => 1,
			'seats' => 3
		]);
	}
}
