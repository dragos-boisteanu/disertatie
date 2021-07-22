@if ($paginator->hasPages())
    <ul class="text-trueGray-300 flex-initial px-2 py-4 flex items-center justify-between gap-x-2 text-xs md:justify-end">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <li class="pointer-events-none rounded-sm px-2 py-1 border border-trueGray-600 text-trueGray-600 hover:border-orange-600"><span>Previous</span></li>
        @else
            <li><a href="{{ $paginator->previousPageUrl() }}" class="px-2 py-1 rounded-sm border border-trueGray-300  hover:border-orange-600"
                    rel="prev">Previous</a></li>
        @endif

        @if ($paginator->currentPage() > 2)
            <li class="hidden-xs"><a class="px-2 py-1 mx-1 border hover:border-orange-600 rounded-sm" href="{{ $paginator->url(1) }}">1</a></li>
        @endif

        @if ($paginator->currentPage() >= 4)
            <li class="py-1"><span>...</span></li>
        @endif

        @foreach (range(1, $paginator->lastPage()) as $i)
            @if ($i >= $paginator->currentPage() - 1 && $i <= $paginator->currentPage() + 1)
                @if ($i == $paginator->currentPage())
                    <li class="px-2 py-1 mx-1 border border-orange-600 rounded-sm"><span>{{ $i }}</span></li>
                @else
                    <li><a class="block text-center h-full px-2 py-1 mx-1 border border-trueGray-300 hover:border-orange-600 rounded-sm" href="{{ $paginator->url($i) }}">{{ $i }}</a></li>
                @endif
            @endif
        @endforeach

        @if ($paginator->currentPage() < $paginator->lastPage() - 2)
            <li class="py-1"><span>...</span></li>
        @endif

        @if ($paginator->currentPage() <= $paginator->lastPage() - 2)
            <li class="px-2 py-1 mx-1 border border-trueGray-300 hover:border-orange-600 rounded-sm"><a
                    href="{{ $paginator->url($paginator->lastPage()) }}">{{ $paginator->lastPage() }}</a></li>
        @endif

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <li><a href="{{ $paginator->nextPageUrl() }}" class="px-2 py-1 rounded-sm border border-trueGray-300 hover:border-orange-600" rel="next">Next</a></li>
        @else
        <li class="pointer-events-none rounded-sm px-2 py-1 border border-trueGray-600 text-trueGray-600 hover:border-orange-600"><span>Next</span></li>
        @endif
    </ul>
@endif
