<?php


namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'products_brands', 'product_id', 'brand_id');
    }
}
