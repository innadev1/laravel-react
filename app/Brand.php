<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    public function languages()
    {
        return $this->belongsToMany(Language::class, 'languages_brands', 'brand_id', 'language_id');
    }

    public function domains()
    {
        return $this->belongsToMany(Domain::class, 'domains_brands', 'brand_id', 'domain_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_brands', 'brand_id', 'product_id');
    }
}
