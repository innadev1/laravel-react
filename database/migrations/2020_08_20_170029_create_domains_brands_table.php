<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDomainsBrandsTable extends Migration
{
    public function up()
    {
        Schema::create('domains_brands', function (Blueprint $table) {
            $table->bigInteger('domain_id')->unsigned()->nullable();
            $table->bigInteger('brand_id')->unsigned()->nullable();
            $table->foreign('domain_id')->references('id')->on('domains');
            $table->foreign('brand_id')->references('id')->on('brands');
        });
    }

    public function down()
    {
        Schema::dropIfExists('domains_brands');
    }
}
