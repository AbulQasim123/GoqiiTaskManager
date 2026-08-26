<?php

namespace App\Http\Controllers;

use App\Http\Requests\{
    StoreTaskRequest,
    TaskIndexRequest,
    UpdateTaskRequest,
};
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\TaskService;

class TaskController extends Controller
{
    public function __construct(private readonly TaskService $taskService)
    {

    }

    // Display tasks.
    public function index(TaskIndexRequest $request)
    {
        $tasks = $this->taskService->getTasks(
            auth('api')->user(),
            $request->status(),
            $request->perPage()
        );

        return TaskResource::collection($tasks);
    }

    // Admin creates and assigns a task.
    public function store(StoreTaskRequest $request)
    {
        $task = $this->taskService->createTask(
            auth('api')->user(),
            $request->validated()
        );

        return response()->json([
            'status' => true,
            'message' => 'Task created and assigned successfully.',
            'data' => new TaskResource($task),
        ], 201);
    }

    /**
     * Display single task.
     */
    public function show(int $id): TaskResource
    {
        $task = $this->taskService->getTask(
            auth('api')->user(),
            Task::findOrFail($id)
        );

        return new TaskResource($task);
    }

    // Admin can update everything.
    // User can update only status.
    public function update(UpdateTaskRequest $request, int $id)
    {
        $task = Task::findOrFail($id);

        $task = $this->taskService->updateTask(auth('api')->user(), $task, $request->validated());

        return response()->json([
            'message' => 'Task updated successfully.',
            'data' => new TaskResource($task),
        ]);
    }

    // Only admin can delete.
    public function destroy(int $id)
    {
        $task = Task::findOrFail($id);

        $this->taskService->deleteTask(
            auth('api')->user(),
            $task
        );

        return response()->json([
            'message' => 'Task deleted successfully.',
        ]);
    }

    // Task statistics
    public function stats()
    {
        $stats = $this->taskService->getStats(
            auth('api')->user()
        );

        return response()->json([
            'data' => $stats,
        ]);
    }
}
