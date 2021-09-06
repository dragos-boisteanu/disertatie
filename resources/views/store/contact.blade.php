@extends('layouts.store')


@section('content')
<div class="w-full mx-auto mt-8 lg:w-4/5 2xl:w-5/6 px-8 lg:px-0 md:grid md:grid-cols-2 md:gap-4 2xl:grid-cols-6">

	<div
		class=" flex flex-col gap-4 md:flex-row md:justify-between md:flex-wrap md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-auto 2xl:col-span-3">
		<div>
			<h3 class="text-trueGray-400 text-xl font-semibold">
				Program
			</h3>
			<ul class="text-trueGray-500 ml-1 text-sm">
				<li class="my-2">
					<span class="font-semibold text-trueGray-500">L - V:</span> <span class="text-trueGray-300">10:00</span>
					<span class="text-red-700"> / </span> <span class="text-trueGray-300">22:00</span>
				</li>
				<li class="my-2">
					<span class="font-semibold text-trueGray-500">S - D:</span> <span class="text-trueGray-300">12:00</span> <span
						class="text-red-700"> / </span> <span class="text-trueGray-300">24:00</span>
				</li>
			</ul>
		</div>

		<div>
			<h3 class="text-trueGray-400 text-xl font-semibold">
				Telefon
			</h3>
			<ul class="ml-1 text-sm">
				<li class="my-1 flex items-center">
					<div class="text-sky-700 w-20 ">Digi</div> <span class="text-trueGray-300">1234567890</span>
				</li>
				<li class="my-1 flex items-center">
					<span class="text-orange-600 w-20">Orange</span> <span class="text-trueGray-300">1234567890</span>
				</li>
				<li class="my-1 flex items-center">
					<span class="text-red-600 w-20">Vodafone</span> <span class="text-trueGray-300">1234567890</span>
				</li>
				<li class="my-1 flex items-center">
					<span class="text-fuchsia-700 w-20">Telekom</span> <span class="text-trueGray-300">1234567890</span>
				</li>
			</ul>
		</div>

		<div>
			<h3 class="text-trueGray-400 text-xl font-semibold">
				Adresa
			</h3>
			<div class="text-trueGray-500 ml-1 w-72 overflow-ellipsis">
				Braila, Braila, Str Scolilor Nr 47, Bloc B20, Scara 8, Apartament 19 213123123123123
			</div>
		</div>
	</div>

	<div
		class="mt-4 flex flex-col gap-4  md:gap-y-32 md:flex-row md:col-span-2 lg:col-span-1 lg:row-span-2 lg:flex-col lg:justify-self-center lg:self-center 2xl:col-span-3">
		<div class="w-full max-w-lg h-64 lg:h-80">
			<img class="w-full h-full rounded-md shadow object-cover" src="{{ asset('storage/map.png') }}"
				alt="map address" />
		</div>
		<div class="w-full max-w-lg h-64 lg:h-80">
			<img class="w-full h-full rounded-md shadow object-cover" src="{{ asset('/storage/store-front.jpg') }}"
				alt="store front" />
		</div>
	</div>

	<div class="mt-4 md:col-span-2 lg:col-span-1 lg:row-span-1 2xl:col-span-2 2xl:justify-self-center">
		<h3 class="my-2 text-trueGray-400 text-xl font-semibold">
			Formular contact
		</h3>
		<form method="POST" action="/">
			@csrf

			<div class="flex flex-col gap-y-4">
				<div>
					<label class="block text-trueGray-400 font-semibold mb-2">Nume</label>
					<input type="text" name="firstName" value="{{ old('firstName')}}"
						class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif">
				</div>

				<div>
					<label class="block text-trueGray-400 font-semibold mb-2">Prenume</label>
					<input type="text" name="lastName" value="{{ old('lastName') }}"
						class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif" />
				</div>

				<div>
					<label class="block text-trueGray-400 font-semibold mb-2">Email</label>
					<input type="text" name="email" value="{{ old('email') }}"
						class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif" />
				</div>

				<div>
					<label class="block text-trueGray-400 font-semibold mb-2">Telefon</label>
					<input type="text" name="phoneNumber" value="{{ old('phoneNumber') }}"
						class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif" />
				</div>

				<div>
					<label class="block text-trueGray-400 font-semibold mb-2">Categorie</label>
					<select id="reason" name="reason"
						class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif">
						<option value="" selected disabled>Motiv</option>
						<option value="0" @if (old('reason')==0) selected @endif>Informatii</option>
						<option value="1" @if (old('reason')==1) selected @endif>Feedback</option>
						<option value="2" @if (old('reason')==2) selected @endif>Relcamatii</option>
						<option value="3" @if (old('reason')==3) selected @endif>Altul</option>
					</select>

					<input id="otherReason" type="text" name="otherReason" placeholder="Alt motiv..."
						value="{{ old('otherReason') }}" style="display: none"
						class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif">
				</div>

				<div>
					<label class="block text-trueGray-400 font-semibold mb-2">Descriere</label>
					<textarea name="description"
						class="w-full border text-sm p-2 rounded-sm focus:ring focus:ring-orange-600 @if ($errors->has('firstName')) border-red-600 @endif"></textarea>
				</div>
			</div>

			<div class="w-full text-right mt-4">
				<button type="submit"
					class="w-full md:w-auto lg:w-auto bg-sky-600 hover:bg-sky-500 active:shadow-inner disabled:bg-gray-700 disabled:cursor-default transition-colors  text-white p-2 rounded-sm">Trimite</button>
			</div>
		</form>
	</div>

</div>
@endsection