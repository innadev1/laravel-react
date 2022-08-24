<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsCustomers extends Migration
{
    public function up()
    {
        Schema::create('groups_customers', function (Blueprint $table) {
            $table->bigInteger('group_id')->unsigned()->nullable();
            $table->bigInteger('customer_id')->unsigned()->nullable();
            $table->foreign('group_id')->references('id')->on('groups');
            $table->foreign('customer_id')->references('id')->on('customers');
        });
    }

    public function down()
    {
        Schema::dropIfExists('groups_customers');
    }
}
