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
            'name' => 'Client'
        ]);

        DB::table('roles')->insert([
            'name' => 'Server'
        ]);

        DB::table('roles')->insert([
            'name' => 'Kitchen'
        ]);

        DB::table('roles')->insert([
            'name' => 'Kitchen Manager/Chef'
        ]);

        DB::table('roles')->insert([
            'name' => 'Delivery'
        ]);

        DB::table('roles')->insert([
            'name' => 'Location Manager',
        ]);

        DB::table('roles')->insert([
            'name' => 'Administrator'
        ]);
    }
}
