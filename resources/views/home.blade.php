@extends('layouts.store')

@section('content')
<div class="w-full mx-auto mt-8 lg:w-11/12 2xl:w-5/6">
	<ul class="mx-auto w-5/6 lg:w-full h-full gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
		@foreach($categories as $category)
		<li
			class="bg-white mt-6 rounded transition-all duration-700 ease-in-out hover:-translate-y-3 md:mt-0 hover:shadow-lg">
			<a class="block w-full p-3" href="{{ route('category.show', ['categorySlug'=>$category->slug])}}">
				<div class="h-80 w-full">
					@isset($category->image)
					<img class="h-full w-full rounded object-cover" src="{{ asset("$category->image")}}" alt="category image" />
					@else
					<img class="h-full w-full rounded bg-fill"
						src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="category image" />
					@endif

				</div>
				<div class="mt-2 font-semibold text-xl text-center py-2 italic">
					{{ $category->name }}
				</div>
			</a>
		</li>
		@endforeach
	</ul>
</div>
@endsection