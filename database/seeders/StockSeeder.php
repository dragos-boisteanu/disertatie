<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stocks')->insert([
            'quantity' => '999999999',
        ]);

        DB::table('stocks')->insert([
            'quantity' => '999999999',
        ]);
    }
}
