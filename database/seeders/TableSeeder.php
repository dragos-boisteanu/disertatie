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
            'name' => '1',
            'status_id' => 1
        ]);

        DB::table('tables')->insert([
            'name' => '2',
            'status_id' => 1
        ]);

        DB::table('tables')->insert([
            'name' => '3',
            'status_id' => 1
        ]);

        DB::table('tables')->insert([
            'name' => '4',
            'status_id' => 1
        ]);

        DB::table('tables')->insert([
            'name' => '5',
            'status_id' => 1
        ]);

        DB::table('tables')->insert([
            'name' => '6',
            'status_id' => 1
        ]);
    }
}
