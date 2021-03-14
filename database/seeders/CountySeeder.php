<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\County;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CountySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get('database/data/judete-orase.json');
        $data = json_decode($json,true);
     
        foreach($data["judete"] as $judet) {

            $county = County::create([
                'name' => $judet["nume"],
                'auto' =>  $judet["auto"]
            ]);
            
            
            foreach($judet["localitati"] as $localitate) {
                City::create([
                    'name' => $localitate['nume'],
                    'county_id' => $county->id
                ]);
            }
        }
    }
}
