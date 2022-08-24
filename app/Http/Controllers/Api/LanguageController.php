<?php

namespace App\Http\Controllers\Api;

use App\Language;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function index()
    {
        $languages = Language::orderBy('id')->get();

        return response()->json($languages);
    }

    public function store(Request $request) {
        $languages = new Language;
        $languages->id = request('id');
        $languages->language_key = request('language_key');
        $languages->save();

        return response()->json($languages);
    }

    public function update(Request $request, $id) {
        $languages = Language::find($id);
        $languages->language_key = $request->get('language_key');
        $languages->save();

        return response()->json($languages);
    }

    public function destroy($id)
    {
        $languages = Language::find($id);
        $languages->delete();

        return response()->json('Deleted successfully');
    }
}
