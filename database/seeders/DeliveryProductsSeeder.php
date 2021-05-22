<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveryProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'Delivery to address',
            'description' => 'Deliver order to client address',
            'barcode' => '000001',
            'weight' => 1,
            'unit_id' => 1,
            'category_id' => 1,
            'stock_id' => 1,
            'has_ingredients' => 0,
            'base_price' => 15
        ]);

        DB::table('products')->insert([
            'name' => 'Local delivery',
            'description' => 'The client has to come at the local to get his order',
            'barcode' => '000002',
            'weight' => 1,
            'unit_id' => 1,
            'category_id' => 1,
            'stock_id' => 2,
            'has_ingredients' => 0,
            'base_price' => 0
        ]);
    }
}
