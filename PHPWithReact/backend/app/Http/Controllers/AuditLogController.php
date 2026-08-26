<?php

namespace App\Http\Controllers;

use App\Services\AuditLogService;
use Illuminate\Http\Request;

class AuditLogController extends Controller
{
    public function __construct(
        private readonly AuditLogService $auditLogService
    ) {
    }

    public function index(Request $request)
    {
        $user = auth('api')->user();

        if (!$user->isAdmin()) {
            return response()->json([
                'error' => 'Forbidden - Admin only'
            ], 403);
        }

        return response()->json([
            'data' => $this->auditLogService->getLogs(
                $request->only([
                    'action',
                    'user_id',
                    'search',
                    'from_date',
                    'to_date',
                    'per_page',
                ])
            ),
        ],200);
    }

    public function actions()
    {
        $user = auth('api')->user();

        if (!$user->isAdmin()) {
            return response()->json([
                'error' => 'Forbidden'
            ], 403);
        }

        return response()->json([
            'data' => $this->auditLogService->getActions(),
        ],200);
    }
}
