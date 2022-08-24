<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormsTable extends Migration
{
    public function up()
    {
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->longText('name');
            $table->longText('slug');
            $table->string('owner');
            $table->bigInteger('owner_id');
            $table->timestampTz('start_d')->nullable();
            $table->timestampTz('end_d')->nullable();
            $table->longText('groups')->nullable();
            $table->longText('banners')->nullable();
            $table->longText('landingPage')->nullable();
            $table->longText('phone')->nullable();
            $table->longText('email_to')->nullable();
            $table->longText('email_subject')->nullable();
            $table->longText('email_body')->nullable();
            $table->longText('sms_text')->nullable();
            $table->longText('web_push_link')->nullable();
            $table->longText('web_push_text')->nullable();
            $table->boolean('active')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->timestampTz('created_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('forms');
    }
}
