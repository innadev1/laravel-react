<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Folder;
use App\Group;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupController extends Controller
{
    public function storeGroup(Request $request)
    {
        $group = new Group;
        $group->group_name = $request->get('group_name');
        $group->save();

        $lastId = (int)DB::getPdo()->lastInsertId();
        $group->folders()->attach([$lastId => ['folder_id' => $request->get('folder_id')]]);

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function editGroup(Request $request, $id)
    {
        $group = Group::find($id);
        $group->group_name = $request->get('group_name');
        $group->save();

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function destroyGroup($id)
    {
        $group = Group::find($id);

        $customerId = DB::table('groups_customers')->select('customer_id')->where('group_id', $id)->get();
        $customerIds = array();
        foreach(json_decode($customerId, true) as $customer) {
            $customerIds[] = $customer['customer_id'];
        }

        $group->folders()->wherePivot('group_id', '=', $id)->detach();
        $group->customers()->wherePivot('group_id', '=', $id)->detach();
        Customer::whereIn('id', $customerIds)->delete();

        $group->delete();

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function moveGroup(Request $request, $id)
    {
        $group = Group::find($id);
        $folderId = $group->folders()->wherePivot('group_id', '=', $id)->get('folder_id');
        $folder = Folder::find($folderId);
        $folder->level = $request->get('level');
        $folder->parent_id = $request->get('parent_id');
        $folder->save();

        return response()->json('Group moved successfully');
    }
}
