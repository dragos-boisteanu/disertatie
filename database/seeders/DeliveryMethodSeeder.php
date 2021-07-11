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
            'name' => 'Livrarea la adresa',
            'price' => 15
        ]);

        DB::table('delivery_methods')->insert([
            'name' => 'Ridicare din local',
            'price' => 0
        ]);

        DB::table('delivery_methods')->insert([
            'name' => 'Comanda la masa',
            'price' => 0
        ]);
    }
}
