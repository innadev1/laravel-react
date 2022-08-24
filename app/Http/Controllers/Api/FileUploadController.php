<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function uploadFile(Request $request)
    {
        $uniqueid=uniqid();
        $extension=$request->file('file')->getClientOriginalExtension();
        $name=$uniqueid.'.'.$extension;
        $currentDate = date('Y-m');
        $path=$request->file('file')->storeAs('public/uploads/'.$currentDate,$name);
        if ($path) {
            return response()->json(array('status'=>'success','message'=>'File successfully uploaded','file'=>'/storage/uploads/'.$currentDate.'/'.$name));
        } else {
            return response()->json(array('status'=>'error','message'=>'Failed to upload file'));
        }
    }
}
