<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SegmentsController extends Controller
{
    public function index()
    {
        return view('segments');
    }
}
