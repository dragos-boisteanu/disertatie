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
            'vat' => 9
        ]);

        DB::table('categories')->insert([
            'name' => 'Deserturi',
            'vat' => 19
        ]);

        DB::table('categories')->insert([
            'name' => 'Ceaiuri',
            'vat' => 19
        ]);

        DB::table('categories')->insert([
            'name' => 'Bauturi Alcoolice',
            'vat' => 19
        ]);

        DB::table('categories')->insert([
            'name' => 'Bauturi Non-Alcolice',
            'vat' => 19
        ]);
    }
}
