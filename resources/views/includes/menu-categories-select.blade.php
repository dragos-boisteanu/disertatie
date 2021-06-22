
<form id="categorySelectForm" method="GET" class="w-full px-4 text-center  lg:hidden">
  <select id="categorySelect" class="w-full rounded-sm p-2">
    <option value="" selected disabled>Alege o categorie</option>
    @foreach($categories as $category)
      <option value="{{$category->id}}" @if (request()->route('id') == $category->id) selected @endif>{{ $category->name }}</option>
    @endforeach
  </select>
</form>

@push('scripts')
<script>
  const categorySelect = document.getElementById('categorySelect');
  const categorySelectForm = document.getElementById('categorySelectForm');
  
  categorySelect.addEventListener('change', function(e) {
    e.preventDefault();

    categorySelectForm.action = `/menu/${categorySelect.value}`
    categorySelectForm.submit();
  })

</script>
@endpush
