<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProposalRevision extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proposal_revisions', function (Blueprint $table) {
            $table->id();
            $table->string('number_revision');
            $table->date('data_committee');
            $table->enum('type_price', ['global', 'unity', 'menu']);
            $table->float('medium_histogram')->nullable();
            $table->decimal('global_price', 20, 2);
            $table->decimal('gross_margin', 20, 2);
            $table->float('bdi');
            $table->float('taxes');
            $table->float('charge');
            $table->string('type_warning');
            $table->string('risks');
            $table->string('financial_taxis');

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
        Schema::dropIfExists('proposal_revisions');
    }
}
