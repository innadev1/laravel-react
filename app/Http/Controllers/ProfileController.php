<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function index()
    {
        return view('profile');
    }
}
