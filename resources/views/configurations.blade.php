@extends('layouts.app')

@section('content')
    @auth
        <div id="Configurations"></div>
    @else
        <script>window.location = "/login";</script>
    @endauth
@endsection
