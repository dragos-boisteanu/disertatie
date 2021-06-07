<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('order_statuses')->insert([
           'name' =>  'Awaiting reception'
        ]);

        DB::table('order_statuses')->insert([
           'name' =>  'Received'
        ]);

        DB::table('order_statuses')->insert([
           'name' =>  'Is preparing'
        ]);

        DB::table('order_statuses')->insert([
           'name' =>  'Awaiting delivery'
        ]);

        DB::table('order_statuses')->insert([
           'name' =>  'In delivery'
        ]);
        
        DB::table('order_statuses')->insert([
           'name' =>  'Delivered'
        ]);

        DB::table('order_statuses')->insert([
            'name' =>  'Completed'
        ]);
        
        DB::table('order_statuses')->insert([
            'name' =>  'Canceled'
        ]);

        DB::table('order_statuses')->insert([
            'name' =>  'Awaiting payment'
        ]);

        DB::table('order_statuses')->insert([
            'name' =>  'Payment failed'
        ]);

    }
}
