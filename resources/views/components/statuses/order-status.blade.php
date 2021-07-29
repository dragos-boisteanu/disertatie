@props(['statusName'])

<div class="text-xs py-1 px-2 rounded-sm font-semibold
	@if ($statusName == 'Received') bg-blue-300 text-blue-800 @endif
	@if ($statusName == 'Is preparing') bg-orange-200 text-orange-800 @endif
	@if ($statusName == 'In delivery') bg-yellow-200 text-yellow-800 @endif
	@if ($statusName == 'Delivered') bg-teal-200 text-teal-800 @endif
	@if ($statusName == 'Completed') bg-green-300 text-green-800 @endif
	@if ($statusName == 'Canceled') bg-red-200 text-red-800 @endif
	">
	@if ($statusName == 'Received') Primita @endif
	@if ($statusName == 'Is preparing') Se pregateste @endif
	@if ($statusName == 'In delivery') Se livreaza @endif
	@if ($statusName == 'Delivered') Livrata @endif
	@if ($statusName == 'Completed') Finalizata @endif
	@if ($statusName == 'Canceled') Anulata @endif
</div>