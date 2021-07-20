<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reservation_statuses')->insert([
            'name' => 'Pending',
        ]);

        DB::table('reservation_statuses')->insert([
            'name' => 'Active',
        ]);

        DB::table('reservation_statuses')->insert([
            'name' => 'Completed',
        ]);

        DB::table('reservation_statuses')->insert([
            'name' => 'Canceled',
        ]);
    }
}
