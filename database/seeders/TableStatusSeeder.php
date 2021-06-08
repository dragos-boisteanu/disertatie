<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('table_statuses')->insert([
            'name' =>  'Available'
        ]);

        DB::table('table_statuses')->insert([
            'name' =>  'Busy'
        ]);

        DB::table('table_statuses')->insert([
            'name' =>  'Waiting reservation'
        ]);
    }
}
