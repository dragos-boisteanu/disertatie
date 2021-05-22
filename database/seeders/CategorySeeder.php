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
            'name' => 'Delivery methods',
            'vat' => 0
        ]);

        DB::table('categories')->insert([
            'name' => 'Pizza',
            'vat' => 9
        ]);

        DB::table('categories')->insert([
            'name' => 'Paste',
            'vat' => 9
        ]);

        DB::table('categories')->insert([
            'name' => 'Pui',
            'vat' => 9
        ]);

        DB::table('categories')->insert([
            'name' => 'Porc',
            'vat' => 9
        ]);

        DB::table('categories')->insert([
            'name' => 'Salate',
            'vat' => 9
        ]);

        DB::table('categories')->insert([
            'name' => 'Bauturi',
            'vat' => 19
        ]);
    }
}
