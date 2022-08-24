<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDomainsFormsTable extends Migration
{
    public function up()
    {
        Schema::create('domains_forms', function (Blueprint $table) {
            $table->bigInteger('domain_id')->unsigned()->nullable();
            $table->bigInteger('form_id')->unsigned()->nullable();
            $table->foreign('domain_id')->references('id')->on('domains');
            $table->foreign('form_id')->references('id')->on('forms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('domains_forms');
    }
}
