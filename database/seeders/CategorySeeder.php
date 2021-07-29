<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('categories')->insert([
            'name' => 'Pizza',
            'slug' => 'pizza',
            'vat' => 9,
            'position' => 1
        ]);

        DB::table('categories')->insert([
            'name' => 'Deserturi',
            'slug' => 'deserturi',
            'vat' => 19,
            'position' => 2
        ]);

        DB::table('categories')->insert([
            'name' => 'Ceaiuri',
            'slug' => 'ceaiuri',
            'vat' => 19,
            'position' => 3
        ]);

        DB::table('categories')->insert([
            'name' => 'Bere',
            'slug' => 'bere',
            'vat' => 19,
            'position' => 4
        ]);

        DB::table('categories')->insert([
            'name' => 'Vinuri',
            'slug' => 'vin',
            'vat' => 19,
            'position' => 5
        ]);
    }
}
