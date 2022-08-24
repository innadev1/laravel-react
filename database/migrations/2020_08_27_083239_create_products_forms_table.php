<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsFormsTable extends Migration
{
    public function up()
    {
        Schema::create('products_forms', function (Blueprint $table) {
            $table->bigInteger('product_id')->unsigned()->nullable();
            $table->bigInteger('form_id')->unsigned()->nullable();
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('form_id')->references('id')->on('forms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products_forms');
    }
}
