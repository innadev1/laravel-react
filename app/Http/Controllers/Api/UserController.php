<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function update(Request $request, $id)
    {
        $users = User::find($id);
        $users->name = $request->get('name');
        $users->save();

        return response()->json('User Updated Successfully.');
    }
}
