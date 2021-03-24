<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('units')->insert([
            'name' => 'g',
            'description' => 'grams'
        ]);

        DB::table('units')->insert([
            'name' => 'ml',
            'description' => 'milliliters'
        ]);

        DB::table('units')->insert([
            'name' => 'L',
            'description' => 'liters'
        ]);
    }
}
