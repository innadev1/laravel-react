<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'domains_brands', 'domain_id', 'brand_id');
    }
}
