@extends('layouts.app')

@section('content')
    @auth
        <div class="container">
            <div id="MainCalendar" data-name="{{Auth::user()->name}}" data-id="{{Auth::user()->id}}"></div>
        </div>
    @else
        <script>window.location = "/login";</script>
    @endauth
@endsection
