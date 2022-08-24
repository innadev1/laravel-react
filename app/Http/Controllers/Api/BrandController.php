<?php


namespace App\Http\Controllers\Api;

use App\Brand;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::with('languages', 'domains', 'products')->orderBy('id')->get();

        return response()->json($brands);
    }

    public function store(Request $request) {
        $brands = new Brand;
        $brands->id = request('id');
        $brands->brand_name = request('brand_name');
        $brands->save();

        foreach(request('domainArr') as $domain) {
            $brands->domains()->attach([$request['id'] => ['domain_id' => $domain['id']]]);
        }
        foreach(request('languageArr') as $language) {
            $brands->languages()->attach([$request['id'] => ['language_id' => $language['id']]]);
        }
        foreach(request('productArr') as $product) {
            $brands->products()->attach([$request['id'] => ['product_id' => $product['id']]]);
        }

        return response()->json($brands);
    }

    public function update(Request $request, $id) {
        $brands = Brand::find($id);
        $brands->brand_name = $request->get('brand_name');
        $brands->save();
        //PIVOTS (NEED TO BE REFACTORED)
        $brands->domains()->wherePivot('brand_id', '=', $id)->detach();
        $brands->languages()->wherePivot('brand_id', '=', $id)->detach();
        $brands->products()->wherePivot('brand_id', '=', $id)->detach();

        foreach(request('domainArr') as $domain) {
            $brands->domains()->attach([$request['id'] => ['domain_id' => $domain['id']]]);
        }
        foreach(request('languageArr') as $language) {
            $brands->languages()->attach([$request['id'] => ['language_id' => $language['id']]]);
        }
        foreach(request('productArr') as $product) {
            $brands->products()->attach([$request['id'] => ['product_id' => $product['id']]]);
        }

        return response()->json($brands);
    }

    public function destroy($id)
    {
        $brands = Brand::find($id);
        $brands->domains()->wherePivot('brand_id', '=', $id)->detach();
        $brands->languages()->wherePivot('brand_id', '=', $id)->detach();
        $brands->products()->wherePivot('brand_id', '=', $id)->detach();
        $brands->delete();

        return response()->json('Deleted successfully');
    }
}
