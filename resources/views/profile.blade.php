@extends('layouts.app')

@section('content')
    @auth
        <div id="User" data-id="{{Auth::user()->id}}"></div>
    @else
        <script>window.location = "/login";</script>
    @endauth
@endsection
