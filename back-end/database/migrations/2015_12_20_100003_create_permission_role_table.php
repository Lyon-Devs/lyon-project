<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePermissionRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permission_role', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('permission_id')->unsigned()->index();
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
            $table->bigInteger('role_id')->unsigned()->index();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migration.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('permission_role');
    }
}