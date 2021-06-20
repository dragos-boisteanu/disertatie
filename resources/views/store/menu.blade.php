@extends('layouts.store')

@section('content')
<a href="{{route('dashboard')}}">Dashboard</a>
        @auth
            <form method="post" action="{{route('logout')}}">
                @csrf
                <button>
                    Logout
                </button>
            </form>
        @endauth

@endsection

  