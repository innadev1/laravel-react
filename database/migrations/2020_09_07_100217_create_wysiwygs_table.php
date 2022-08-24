<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWysiwygsTable extends Migration
{
    public function up()
    {
        Schema::create('wysiwygs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('translation_id')->unsigned()->default(0);
            $table->foreign('translation_id')->references('id')->on('languages_forms_translation');
            $table->bigInteger('form_id')->unsigned()->nullable();
            $table->foreign('form_id')->references('id')->on('forms');
            $table->longText('wysiwyg_name');
            $table->longText('wysiwyg_meta');
            $table->timestampTz('updated_at')->nullable();
            $table->timestampTz('created_at')->nullable();
        });
    }

    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('wysiwygs');
        Schema::enableForeignKeyConstraints();
    }
}
