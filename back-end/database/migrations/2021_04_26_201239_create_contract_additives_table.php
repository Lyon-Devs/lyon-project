<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContractAdditivesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_additives', function (Blueprint $table) {
            $table->id();
            $table->string('number_additive');
            $table->enum('type', ['deadline', 'value', 'deadline_value', 'others']);
            $table->date('date_start');
            $table->date('date_end');
            $table->decimal('value', 20, 2)->nullable();
            $table->date('deadline')->nullable();
            $table->mediumText('description');
            $table->unsignedBigInteger('contract_id');
            $table->foreign('contract_id')->references('id')->on('contracts')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contract_additives');
    }
}
