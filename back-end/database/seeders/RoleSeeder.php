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
        $data = [
            ["name" => "administrator", "slug" => "admin", 'description' => "administrate all system", 'system' => 0],
            ["name" => "comercial", "slug" => "comercial", 'description' => "workers of the area", 'system' => 0],
            ["name" => "user", "slug" => "user", 'description' => "user less powers", 'system' => 0],

        ];
        DB::table('roles')->insert($data);
    }
}
