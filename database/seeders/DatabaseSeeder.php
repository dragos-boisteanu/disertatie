<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\CountySeeder;

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
            CountySeeder::class,
            RoleSeeder::class,
            CategorySeeder::class,
            UnitSeeder::class,
            DeliveryMethodSeeder::class,
            OrderStatusSeeder::class,
        ]);

        // \App\Models\User::factory(10)->create();
    }
}
