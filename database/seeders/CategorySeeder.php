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
            'name' => 'Pizza'
        ]);

        DB::table('categories')->insert([
            'name' => 'Paste'
        ]);

        DB::table('categories')->insert([
            'name' => 'Pui'
        ]);

        DB::table('categories')->insert([
            'name' => 'Porc'
        ]);

        DB::table('categories')->insert([
            'name' => 'Salate'
        ]);

        DB::table('categories')->insert([
            'name' => 'Bauturi'
        ]);
    }
}
