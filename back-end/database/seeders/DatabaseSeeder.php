<?php

namespace Database\Seeders;

use App\Models\ActingBranch;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_DEBUG', false)) {

            \App\Models\User::factory(3)->create()->each(function ($user) {
                $user->attachRoleBySlug('admin');
            });

            \App\Models\User::factory(3)->create()->each(function ($user) {
                $user->attachRoleBySlug('user');
            });

            \App\Models\User::factory(3)->create()->each(function ($user) {
                $user->attachRoleBySlug('comercial');
            });
        }
        $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(PermissionRoleSeeder::class);


        //Fill base data
        $this->call(TypeServiceSeeder::class);
        $this->call(ActingBranchSeeder::class);
        $this->call(ClientsSeeder::class);
    }
}
