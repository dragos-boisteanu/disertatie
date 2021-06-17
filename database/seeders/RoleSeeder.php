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
            'level' => 1
        ]);
        
        DB::table('roles')->insert([
            'name' => 'Delivery',
            'level' => 2
        ]);

        DB::table('roles')->insert([
            'name' => 'Kitchen',
            'level' => 3
        ]);

        DB::table('roles')->insert([
            'name' => 'Waiter',
            'level' => 4
        ]);

        DB::table('roles')->insert([
            'name' => 'Kitchen Manager',
            'level' => 5
        ]);

        DB::table('roles')->insert([
            'name' => 'Location Manager',
            'level' => 6
        ]);

        DB::table('roles')->insert([
            'name' => 'Administrator',
            'level' => 7
        ]);
    }
}
