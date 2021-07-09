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
            'vat' => 9
        ]);

        DB::table('categories')->insert([
            'name' => 'Deserturi',
            'slug' => 'deserturi',
            'vat' => 19
        ]);

        DB::table('categories')->insert([
            'name' => 'Ceaiuri',
            'slug' => 'ceaiuri',
            'vat' => 19
        ]);

        DB::table('categories')->insert([
            'name' => 'Bere',
            'slug' => 'bere',
            'vat' => 19
        ]);

        DB::table('categories')->insert([
            'name' => 'Vinuri',
            'slug' => 'vin',
            'vat' => 19
        ]);
    }
}
