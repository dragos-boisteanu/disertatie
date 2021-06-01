<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('users')->insert([
            'first_name' => "Cherry",
            "last_name" => "Jones",
            'phone_number' => '068-7160-01',
            'email' => 'c.jones@randatmail.com',
            'role_id' => 7,
            'password' => Hash::make('12345678')
        ]);

        DB::table('users')->insert([
            'first_name' => "Kelsey",
            "last_name" => "Henderson",
            'phone_number' => '329-2709-43',
            'email' => 'k.henderson@randatmail.com',
            'role_id' => 6,
            'password' => Hash::make('12345678')
        ]);

        DB::table('users')->insert([
            'first_name' => "Fiona",
            "last_name" => "Hall",
            'phone_number' => '441-1453-84',
            'email' => 'f.hall@randatmail.com',
            'role_id' => 5,
            'password' => Hash::make('12345678')
        ]);

        DB::table('users')->insert([
            'first_name' => "Ellia",
            "last_name" => "Tucker",
            'phone_number' => '623-7638-87',
            'email' => 'e.tucker@randatmail.com',
            'role_id' => 4,
            'password' => Hash::make('12345678')
        ]);

        DB::table('users')->insert([
            'first_name' => "Fenton",
            "last_name" => "Ferguson 	",
            'phone_number' => '811-2115-75',
            'email' => 'f.ferguson@randatmail.com',
            'role_id' => 3,
            'password' => Hash::make('12345678')
        ]);

        DB::table('users')->insert([
            'first_name' => "Maddie",
            "last_name" => "Gibson",
            'phone_number' => '256-9016-30',
            'email' => 'm.gibson@randatmail.com',
            'role_id' => 2,
            'password' => Hash::make('12345678')
        ]);

        DB::table('users')->insert([
            'first_name' => "Thomas",
            "last_name" => "Brooks",
            'phone_number' => '844-1849-29',
            'email' => 't.brooks@randatmail.com',
            'role_id' => 1,
            'password' => Hash::make('12345678')
        ]);        
    }
}
