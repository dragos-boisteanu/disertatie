@extends('layouts.store')

@section('content')
    <div class="w-full h-full flex items-start gap-x-10 justify-center">
        @include('includes.menu-categories')
        <div class="w-1/2 text-orange-600 text-4xl  flex items-center justify-start font-semibold">
            Choose a category
        </div>
    </div>
@endsection
