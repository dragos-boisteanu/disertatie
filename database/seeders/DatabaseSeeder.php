<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\TableSeeder;
use Database\Seeders\CountySeeder;
use Database\Seeders\TableStatusSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {            
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            UnitSeeder::class,
            DeliveryMethodSeeder::class,
            OrderStatusSeeder::class,
            UserSeeder::class,
            TableStatusSeeder::class,
            TableSeeder::class
        ]);

        // \App\Models\User::factory(10)->create();
    }
}
