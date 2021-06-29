<ul class="text-gray-600 w-28 hidden lg:block">
  @foreach ($categories as $category)
      <li class="text-center text-lg mt-2 pb-2 w-full  border-b border-transparent hover:text-gray-300 hover:border-gray-300 @if (Route::current()->parameter('id') == $category->id) !text-gray-300 !border-gray-300 @endif">
          <a class="block w-full" href="{{ route('menu.show', ['id' => $category->id]) }}">
              {{ $category->name }}
          </a>
      </li>
  @endforeach
</ul>

