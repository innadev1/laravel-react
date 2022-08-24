<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoldersGroups extends Migration
{
    public function up()
    {
        Schema::create('folders_groups', function (Blueprint $table) {
            $table->bigInteger('folder_id')->unsigned()->nullable();
            $table->bigInteger('group_id')->unsigned()->nullable();
            $table->foreign('folder_id')->references('id')->on('folders');
            $table->foreign('group_id')->references('id')->on('groups');
        });
    }

    public function down()
    {
        Schema::dropIfExists('folders_groups');
    }
}
