@extends('layouts.app')

@section('content')
    @auth
        <div class="container">
            <div id="Segments"></div>
        </div>
    @else
        <script>window.location = "/login";</script>
    @endauth
@endsection
