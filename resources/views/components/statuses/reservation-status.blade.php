@props(['statusName'])


<div class="text-xs py-1 px-2 rounded-sm font-semibold
	@if ($statusName == 'Pending') bg-orange-300 text-orange-800 @endif
	@if ($statusName == 'Active') bg-blue-300 text-blue-800 @endif
	@if ($statusName== 'Completed') bg-green-300 text-green-800 @endif
	@if ($statusName == 'Canceled') bg-red-200 text-red-800 @endif">
	@if ($statusName == 'Pending') In asteptare @endif
	@if ($statusName == 'Active') Activa @endif
	@if ($statusName== 'Completed') Finalizata @endif
	@if ($statusName == 'Canceled') Anulata @endif
</div>