@extends('layouts.home')


@section('content')
<div class="w-full mx-auto mt-8">
	<ul class="w-full h-full gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
		@foreach($categories as $category)
		<li
			class="bg-white mt-6 rounded transition-all duration-700 ease-in-out hover:-translate-y-3 md:mt-0 hover:shadow-lg">
			<a class="block w-full h-full p-2 " href="{{ route('category.show', ['categorySlug'=>$category->slug])}}">
				<div class="h-80 w-full">
					{{-- <img class="h-full w-full bg-cover" src="/" alt="category image" /> --}}
				</div>
				<div class="mt-4 font-semibold text-xl text-center py-2 italic">
					{{ $category->name }}
				</div>
			</a>
		</li>
		@endforeach
	</ul>
</div>
@endsection