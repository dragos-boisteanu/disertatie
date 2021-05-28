<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveryMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('delivery_methods')->insert([
            'name' => 'Delivery',
            'price' => 15
        ]);

        DB::table('delivery_methods')->insert([
            'name' => 'Local',
            'price' => 0
        ]);

        DB::table('delivery_methods')->insert([
            'name' => 'Table',
            'price' => 0
        ]);
    }
}
