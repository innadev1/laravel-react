<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBrandsFormsTable extends Migration
{
    public function up()
    {
        Schema::create('brands_forms', function (Blueprint $table) {
            $table->bigInteger('brand_id')->unsigned()->nullable();
            $table->bigInteger('form_id')->unsigned()->nullable();
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('form_id')->references('id')->on('forms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('brands_forms');
    }
}
