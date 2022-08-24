<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesFormsTranslationTable extends Migration
{
    public function up()
    {
        Schema::create('languages_forms_translation', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('form_id')->unsigned()->nullable();
            $table->foreign('form_id')->references('id')->on('forms');
            $table->bigInteger('language_id')->unsigned()->nullable();
            $table->foreign('language_id')->references('id')->on('languages');
            $table->longText('description');
            $table->longText('body');
            $table->longText('terms');
            $table->timestampTz('updated_at')->nullable();
            $table->timestampTz('created_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('languages_forms_translation');
    }
}
