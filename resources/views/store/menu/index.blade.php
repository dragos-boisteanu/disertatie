@extends('layouts.store')

@section('content')
<div class="w-full lg:w-4/6 2xl:w-1/2 mx-auto">
	{{ Breadcrumbs::render('menu') }}
	<x-menu>
		@include('includes.menu-categories')
		{{-- @include('includes.menu-categories-select') --}}
		<div
			class="w-full h-full mt-8 lg:mt-4 text-gray-700 text-opacity-75 text-4xl flex items-center justify-center font-semibold">
			Alege o categorie
		</div>
	</x-menu>
</div>
@endsection