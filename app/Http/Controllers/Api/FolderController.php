<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Folder;
use App\Group;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FolderController extends Controller
{
    public function index()
    {
        $folders = Folder::with('groups', 'groups.customers')->orderBy('id')->get();

        return response()->json($folders);
    }

    public function storeFolder(Request $request)
    {
        $folder = new Folder;
        $folder->folder_name = $request->get('folder_name');
        $folder->level = $request->get('level');
        $folder->parent_id = $request->get('parent_id');
        $folder->save();

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function editFolder(Request $request, $id)
    {
        $folder = Folder::find($id);
        $folder->folder_name = $request->get('folder_name');
        $folder->save();

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function destroyFolder($id)
    {
        $folder = Folder::find($id);

        $groupId = DB::table('folders_groups')->select('group_id')->where('folder_id', $id)->get();
        $groupIds = array();
        $customerIds = array();
        foreach(json_decode($groupId, true) as $group) {
            $groupIds[] = $group['group_id'];
            $customerId = DB::table('groups_customers')->select('customer_id')->where('group_id', $group['group_id'])->get();
            foreach(json_decode($customerId, true) as $customer) {
                $customerIds[] = $customer['customer_id'];
            }
        }

        $folder->groups()->wherePivot('folder_id', $id)->detach();

        DB::table('groups_customers')->whereIn('group_id', $groupIds)->delete();
        Group::whereIn('id', $groupIds)->delete();
        Customer::whereIn('id', $customerIds)->delete();

        $folder->delete();

        return response()->json(Folder::with('groups', 'groups.customers')->orderBy('id')->get());
    }

    public function moveFolder(Request $request, $id)
    {
        $folder = Folder::find($id);
        $folder->level = $request->get('level');
        $folder->parent_id = $request->get('parent_id');
        $folder->save();

        return response()->json('Folder moved successfully');
    }
}
