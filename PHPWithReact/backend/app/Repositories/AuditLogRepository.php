<?php

namespace App\Repositories;

use App\Models\AuditLog;

class AuditLogRepository
{
    public function create(array $data): AuditLog
    {
        return AuditLog::create($data);
    }

    public function getLogs(array $filters = [])
    {
        return AuditLog::query()
            ->with('user:id,name,email')
            ->when(
                $filters['action'] ?? null,
                fn($query, $action) => $query->where('action', $action)
            )
            ->when(
                $filters['user_id'] ?? null,
                fn($query, $userId) => $query->where('user_id', $userId)
            )
            ->when(
                $filters['search'] ?? null,
                fn($query, $search) =>
                $query->where('description', 'like', "%{$search}%")
            )
            ->when(
                $filters['from_date'] ?? null,
                fn($query, $date) =>
                $query->whereDate('created_at', '>=', $date)
            )
            ->when(
                $filters['to_date'] ?? null,
                fn($query, $date) =>
                $query->whereDate('created_at', '<=', $date)
            )
            ->latest()
            ->paginate($filters['per_page'] ?? 15);
    }

    public function getActions()
    {
        return AuditLog::query()
            ->select('action')
            ->distinct()
            ->pluck('action');
    }
}
