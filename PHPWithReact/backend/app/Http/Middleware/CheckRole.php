<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($role === 'admin' && !$user->isAdmin()) {
            return response()->json(['error' => 'Forbidden - Admin only'], 403);
        }

        return $next($request);
    }
}
