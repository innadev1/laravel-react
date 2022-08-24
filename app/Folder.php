<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'folders_groups', 'folder_id', 'group_id');
    }
}
