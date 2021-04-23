<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProposalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->string('cod_lyon')->index();
            $table->unsignedBigInteger('acting_branch_id');
            $table->foreign('acting_branch_id')->references('id')->on('acting_branches')->onDelete('cascade');
            $table->unsignedBigInteger('buyer_id');
            $table->foreign('buyer_id')->references('id')->on('buyers')->onDelete('cascade');
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->date('date_delivery_comercial_proposal')->nullable();
            $table->date('date_delivery_technique_proposal')->nullable();
            $table->date('date_request')->nullable();
            $table->date('date_technique_visit')->nullable();
            $table->date('deadline_date_confirme')->nullable();
            $table->time('deadline_time_confirme')->nullable();
            $table->mediumText('details_technique_visit')->nullable();
            $table->string('local_technique_visit')->nullable();
            $table->string('medium_histogram')->nullable();
            $table->integer('months_exec')->nullable();
            $table->string('number_client_request')->nullable();
            $table->longText('observations')->nullable();
            $table->string('place_to_deploys_services')->nullable();
            $table->longText('scope')->nullable();
            $table->mediumText('summary_scope')->nullable();
            $table->time('time_technique_visit')->nullable();
            $table->enum('status', [
                'committee_1', 'committee_2', 'draft',
                'lost', 'canceled', 'finished', 'winner'
            ])->default('draft');
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
        Schema::dropIfExists('proposals');
    }
}
