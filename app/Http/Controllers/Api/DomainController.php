<?php


namespace App\Http\Controllers\Api;

use App\Domain;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    public function index()
    {
        $domains = Domain::orderBy('id')->get();

        return response()->json($domains);
    }

    public function store(Request $request) {
        $domains = new Domain;
        $domains->id = request('id');
        $domains->domain_name = request('domain_name');
        $domains->save();

        return response()->json($domains);
    }

    public function update(Request $request, $id) {
        $domains = Domain::find($id);
        $domains->domain_name = $request->get('domain_name');
        $domains->save();

        return response()->json($domains);
    }

    public function destroy($id)
    {
        $domains = Domain::find($id);
        $domains->delete();

        return response()->json('Deleted successfully');
    }
}
