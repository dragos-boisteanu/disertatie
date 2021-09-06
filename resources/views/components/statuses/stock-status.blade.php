@props(['quantity'])


<div class="text-sm semibold ">
	@if ($quantity > 0)
	<div class="rounded py-1 px-2 bg-green-200 text-green-800">In stoc</div>
	@else
	<div class="rounded py-1 px-2 bg-red-200 text-red-800">Nu este in stoc</div>
	@endif
</div>