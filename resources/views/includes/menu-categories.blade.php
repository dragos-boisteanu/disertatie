{{-- should be full width on mobile and tablet --}}

<div id="menuCategories"
	class="w-full sticky z-[1] top-0 right-0 text-gray-600 bg-gray-800 overflow-x-auto lg:bg-transparent lg:overflow-hidden lg:w-28 lg:top-8 lg:shadow-none">
	<ul class="flex flex-row items-center gap-x-8 lg:block overflow-x-auto">
		@foreach ($categories as $category)
		<li
			class="text-center text-lg mt-2 pb-2 w-full border-b border-transparent hover:text-gray-300 lg:hover:border-gray-300 @if (Route::current()->parameter('categorySlug') == $category->slug) !text-gray-300 lg:!border-gray-300 @endif">
			<a class="block w-full" href="{{ route('category.show', ['categorySlug' => $category->slug]) }}"
				data-category-link>
				{{ $category->name }}
			</a>
		</li>
		@endforeach
	</ul>
</div>


@push('scripts')
<script>
	const menuCategories = $('#menuCategories');

	$(window).scroll(function(){
	if($(this).scrollTop() > 338) {
		menuCategories.addClass('shadow-md');
	} else {
		menuCategories.removeClass('shadow-md');
	}
	});
</script>
@endpush