<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DashboardCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->role->id === 1) {
            return redirect()->route('home')->withErrors(['danger', 'Unauthorized']);
        }

        return $next($request);
    }
}
