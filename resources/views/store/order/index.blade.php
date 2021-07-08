@extends('layouts.store')


@section('content')
    <div class="w-full lg:w-2/4 2xl:w-1/3">
        <h1 class="text-4xl mb-4 pl-2 font-semibold text-trueGray-300 ">Comenzile mele</h1>

        <form id="filterForm" class="flex items-center justify-between" method="GET" action="{{ route('order.index') }}">
            <div class="bg-white rounded-sm flex items-stretch">
                <input  class="w-full border border-r-0 p-2 rounded-sm rounded-r-none text-sm focus:ring focus:ring-orange-600" type="text" name="id" placeholder="ID comanda"/>
                <button type="submit" class="px-2 border border-l-0 rounded-sm rounded-l-none">
                    <svg class="fill-current text-trueGray-800" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                </button>
            </div>

            <select id="orderBy" name="orderBy" class=" border border-r-0 p-2 rounded-sm rounded-r-none text-sm focus:ring focus:ring-orange-600">
                <option value="1" {{ $orderBy == 1 ? 'selected' : ''}}>Cele mai recente</option>
                <option value="2" {{ $orderBy == 2 ? 'selected' : ''}}>Cele mai vechi</option>
            </select>
        </form>

        <div class="mt-4">
            <ul>
                @forelse($orders as $order)
                    <li
                        class="flex items-center bg-trueGray-50 rounded shadow-md mt-3 first:mt-0 border  hover:border-orange-600">
                        <a href="{{ route('order.show', ['id' => $order->id]) }}" class="p-2 block w-full text-sm">
                            <div class="flex items-center justify-between">
                                <div class="text-lg text-trueGray-800 font-semibold">
                                    #{{ $order->id }}
                                </div>
                                <div class="text-xs py-1 px-2 rounded-sm font-semibold
                                    @if ($order->status->name == 'Canceled') bg-red-200 text-red-800 @endif
                                    @if ($order->status->name == 'Received') bg-blue-300 text-blue-800 @endif
                                    @if ($order->status->name == 'Completed') bg-green-300 text-green-800 @endif
                                    ">
                                    {{ $order->status->name }}
                                </div>
                            </div>

                            <div class="flex items-center justify-between my-2">
                                <div>
                                    {{ $order->deliveryMethod->name }}
                                </div>
                                <div>
                                    {{ $order->created_at }}
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <div>
                                    {{ $order->totalQuantity }} <span class="font-semibold">produs{{ $order->totalQuantity > 1 ? 'e' : '' }}</span>
                                </div>

                                <div>
                                    <span class="font-semibold">Total</span> {{ $order->totalValue }} Ron
                                </div>
                            </div>

                        </a>
                    </li>
                @empty
                    <li>
                        Nu ai facut nici o comanda pana acum.
                    </li>
                @endif
            </ul>
            {{ $orders->links() }}
        </div>

    </div>

@endsection


@push('scripts')
    <script>
        $('#orderBy').change(function() {
            $('#filterForm').submit();
        })

    </script>

@endpush