<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use App\Repositories\TaskRepository;
use App\Services\AuditLogService;

class TaskService
{
    public function __construct(
        private readonly TaskRepository $taskRepository,
        private readonly AuditLogService $auditLogService
    ) {
    }

    public function getTasks(User $user, ?string $status, int $perPage)
    {
        $userId = $user->isAdmin() ? null : $user->id;

        return $this->taskRepository->getTasks($userId, $status, $perPage);
    }

    public function getTask(User $user, Task $task)
    {
        if (!$user->isAdmin() && $task->user_id !== $user->id) {
            abort(403, 'You are not allowed to view this task.');
        }

        return $this->taskRepository->findById($task->id);
    }

    public function createTask(User $user, array $data)
    {
        $data['user_id'] = $user->id;
        $data['status'] = $data['status'] ?? 'todo';
        $data['priority'] = $data['priority'] ?? 'medium';

        $task = $this->taskRepository->create($data);

        // Log Audit
        $this->auditLogService->log(
            $user,
            'create',
            'Task',
            $task->id,
            "Task '{$task->title}' created"
        );
        return $task;

    }


    public function updateTask(User $user, Task $task, array $data)
    {
        if (!$user->isAdmin() && $task->user_id !== $user->id) {
            abort(403, 'You are not allowed to update this task.');
        }

        $task = $this->taskRepository->update(
            $task,
            $data
        );

        // Log Audit
        $this->auditLogService->log(
            $user,
            'update',
            'Task',
            $task->id,
            "Task '{$task->title}' updated"
        );
        return $task;
    }

    public function deleteTask(User $user, Task $task)
    {
        if (!$user->isAdmin() && $task->user_id !== $user->id) {
            abort(403, 'You are not allowed to delete this task.');
        }

        $taskId = $task->id;
        $taskTitle = $task->title;

        $this->taskRepository->delete($task);

        // Log Audit
        $this->auditLogService->log(
            $user,
            'delete',
            'Task',
            $taskId,
            "Task '{$taskTitle}' deleted"
        );
    }

    public function getStats(User $user): array
    {
        if ($user->isAdmin()) {
            return [
                'status_counts' => $this->taskRepository->getStats(),
                'user_counts' => $this->taskRepository->getUserStats(),
            ];
        }

        return [
            'status_counts' => $this->taskRepository->getStats($user->id),
        ];
    }
}
