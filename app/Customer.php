<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public function groups() {
        $this->belongsToMany(Group::class, 'groups_customers', 'customer_id', 'group_id');
    }
}
