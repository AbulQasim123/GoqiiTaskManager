<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskRepository
{
    public function getTasks(?int $userId = null, ?string $status = null, int $perPage = 10)
    {
        return Task::query()
            ->with('user:id,name,email')
            ->when(
                $userId,
                fn($query) => $query->where('user_id', $userId)
            )
            ->when(
                $status,
                fn($query) => $query->where('status', $status)
            )
            ->orderBy('due_date')
            ->paginate($perPage);
    }

    public function findById(int $id)
    {
        return Task::with('user:id,name,email')->findOrFail($id);
    }

    public function create(array $data)
    {
        $task = Task::create($data);

        return $task->load('user:id,name,email');
    }

    public function update(Task $task, array $data)
    {
        $task->update($data);

        return $task->fresh()->load('user:id,name,email');
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }

    public function getStats(?int $userId = null)
    {
        $query = Task::query();

        if ($userId) {
            $query->where('user_id', $userId);
        }

        return $query
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();
    }

    public function getUserStats()
    {
        return Task::query()
            ->selectRaw('users.name, COUNT(tasks.id) as task_count')
            ->join('users', 'tasks.user_id', '=', 'users.id')
            ->groupBy('users.id', 'users.name')
            ->get();
    }
}
