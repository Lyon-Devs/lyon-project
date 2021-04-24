<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContractTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('center_of_cost');
            $table->string('contract_number');
            $table->string('purchase_order');
            $table->string('manager_lyon');
            $table->string('manager_lyon_email');
            $table->string('manager_client');
            $table->string('manager_client_email');
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->date('readjustment_base_date')->nullable();
            $table->unsignedBigInteger('proposal_id');
            $table->foreign('proposal_id')->references('id')->on('proposals')->onDelete('cascade');
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
        Schema::dropIfExists('contracts');
    }
}
