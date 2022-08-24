<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesBrandsTable extends Migration
{
    public function up()
    {
        Schema::create('languages_brands', function (Blueprint $table) {
            $table->bigInteger('language_id')->unsigned()->nullable();
            $table->bigInteger('brand_id')->unsigned()->nullable();
            $table->foreign('language_id')->references('id')->on('languages');
            $table->foreign('brand_id')->references('id')->on('brands');
        });
    }

    public function down()
    {
        Schema::dropIfExists('languages_brands');
    }
}
