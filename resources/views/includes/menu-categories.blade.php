<ul class="text-gray-600 w-28 hidden lg:block">
	@foreach ($categories as $category)
	<li
		class="text-center text-lg mt-2 pb-2 w-full  border-b border-transparent hover:text-gray-300 hover:border-gray-300 @if (Route::current()->parameter('categorySlug') == $category->slug) !text-gray-300 !border-gray-300 @endif">
		<a class="block w-full" href="{{ route('category.show', ['categorySlug' => $category->slug]) }}">
			{{ $category->name }}
		</a>
	</li>
	@endforeach
</ul>