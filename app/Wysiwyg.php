<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wysiwyg extends Model
{
    public function translation()
    {
        return $this->belongsTo(Translation::class, 'translation_id', 'id');
    }
}
