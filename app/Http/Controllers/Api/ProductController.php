<?php


namespace App\Http\Controllers\Api;

use App\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('id')->get();

        return response()->json($products);
    }

    public function store(Request $request) {
        $products = new Product;
        $products->id = request('id');
        $products->product_name = request('product_name');
        $products->save();

        return response()->json($products);
    }

    public function update(Request $request, $id) {
        $products = Product::find($id);
        $products->product_name = $request->get('product_name');
        $products->save();

        return response()->json($products);
    }

    public function destroy($id)
    {
        $products = Product::find($id);
        $products->delete();

        return response()->json('Deleted successfully');
    }
}
