<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'brands_forms', 'form_id', 'brand_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_forms', 'form_id', 'product_id');
    }

    public function domains()
    {
        return $this->belongsToMany(Domain::class, 'domains_forms', 'form_id', 'domain_id');
    }

    public function translations()
    {
        return $this->hasMany(Translation::class, 'form_id', 'id');
    }
}
