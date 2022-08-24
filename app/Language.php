<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'languages_brands', 'language_id', 'brand_id');
    }
}
