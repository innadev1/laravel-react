<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ConfigurationsController extends Controller
{
    public function index()
    {
        return view('configurations');
    }
}
