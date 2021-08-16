<div class=" hidden w-full items-center justify-end px-2 py-2 text-sm lg:flex">
	<div id="auth" class="cursor-pointer outline-none text-gray-500 hover:text-gray-100 px-1">
		Autentificare
	</div>
	<span class="text-red-700 px-1">
		/
	</span>
	<div id="register" class="cursor-pointer text-gray-500 hover:text-gray-100 px-1">
		Inregistrare
	</div>
</div>

@include('includes.auth.login')
@include('includes.auth.register')