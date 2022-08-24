<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CalendarController extends Controller
{
    public function index()
    {
        return view('calendar');
    }
}
