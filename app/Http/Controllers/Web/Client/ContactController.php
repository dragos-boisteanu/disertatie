<?php

namespace App\Http\Controllers\Web\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{

	public function index()
	{
		return view('store.contact');
	}

	public function sendEmail(Request $request)
	{
		// send contact form as email
	}
}
