<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Folder;
use App\Group;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function storeCustomer(Request $request)
    {
        $customer = new Customer;
        $customer->customer_name = $request->get('customer_name');
        $customer->customer_criteria = $request->get('customer_criteria');
        $customer->customer_type = $request->get('customer_type');
        $customer->save();

        $lastId = (int)DB::getPdo()->lastInsertId();
        $group = Group::find($request->get('group_id'));
        $group->customers()->attach([$request->get('group_id') => ['customer_id' => $lastId]]);

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function editCustomer(Request $request, $id)
    {
        $customer = Customer::find($id);
        $customer->customer_name = $request->get('customer_name');
        $customer->customer_criteria = $request->get('customer_criteria');
        $customer->customer_type = $request->get('customer_type');
        $customer->save();

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function destroyCustomer(Request $request, $id)
    {
        $customer = Customer::find($id);
        $group = Group::find($request->get('group_id'));
        $group->customers()->wherePivot('customer_id', '=', $id)->detach();
        $customer->delete();

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }
}
