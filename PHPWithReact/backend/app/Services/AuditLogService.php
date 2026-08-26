<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\AuditLogRepository;

class AuditLogService
{
    public function __construct(private readonly AuditLogRepository $auditLogRepository)
    {
    }

    public function log(
        User $user,
        string $action,
        string $entityType,
        ?int $entityId,
        string $description
    ) {
        return $this->auditLogRepository->create([
            'user_id' => $user->id,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'description' => $description,
            'ip_address' => request()->ip(),
        ]);
    }

    public function getLogs(array $filters = [])
    {
        return $this->auditLogRepository->getLogs($filters);
    }

    public function getActions()
    {
        return $this->auditLogRepository->getActions();
    }
}
