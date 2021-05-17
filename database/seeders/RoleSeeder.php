<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'Client',
            'livel' => 1
        ]);
        
        DB::table('roles')->insert([
            'name' => 'Delivery',
            'livel' => 2
        ]);

        DB::table('roles')->insert([
            'name' => 'Server',
            'livel' => 3
        ]);

        DB::table('roles')->insert([
            'name' => 'Kitchen',
            'livel' => 4
        ]);

        DB::table('roles')->insert([
            'name' => 'Kitchen Manager/Chef',
            'livel' => 5
        ]);


        DB::table('roles')->insert([
            'name' => 'Location Manager',
            'livel' => 6
        ]);

        DB::table('roles')->insert([
            'name' => 'Administrator',
            'livel' => 7
        ]);
    }
}
