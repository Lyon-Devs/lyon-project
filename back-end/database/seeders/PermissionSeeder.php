<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'slug'     => 'admin',
                'resource' => 'administrator',
                'name'     => 'administrator system',
                'system'   => 0,
            ],
            [
                'slug'     => 'edit',
                'resource' => 'edit',
                'name'     => 'edit and update system',
                'system'   => 0,
            ],
            [
                'slug'     => 'view',
                'resource' => 'view',
                'name'     => 'view only',
                'system'   => 0,
            ],
        ];
        DB::table('permissions')->insert($data);
    }
}
