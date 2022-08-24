<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public function folders()
    {
        return $this->belongsToMany(Folder::class, 'folders_groups', 'group_id', 'folder_id');
    }

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'groups_customers', 'group_id', 'customer_id');
    }
}
