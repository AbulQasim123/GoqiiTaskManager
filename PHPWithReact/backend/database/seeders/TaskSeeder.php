<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@goqii.com')->first();
        $user = User::where('email', 'user@goqii.com')->first();

        // For Admin
        Task::create([
            'user_id' => $admin->id,
            'title' => 'Review all pull requests',
            'description' => 'Code review for sprint 5 features',
            'status' => 'in-progress',
            'priority' => 'high',
            'due_date' => '2026-08-28'
        ]);

        Task::create([
            'user_id' => $admin->id,
            'title' => 'Setup CI/CD pipeline',
            'description' => 'GitHub Actions auto deploy',
            'status' => 'todo',
            'priority' => 'high',
            'due_date' => '2026-09-01'
        ]);

        Task::create([
            'user_id' => $admin->id,
            'title' => 'Weekly team report',
            'status' => 'done',
            'priority' => 'medium',
            'due_date' => '2026-08-25'
        ]);

        // For User
        Task::create([
            'user_id' => $user->id,
            'title' => 'Fix responsive navbar',
            'description' => 'Mobile sidebar toggle fix',
            'status' => 'in-progress',
            'priority' => 'medium',
            'due_date' => '2026-08-29'
        ]);

        Task::create([
            'user_id' => $user->id,
            'title' => 'Add form validation',
            'status' => 'todo',
            'priority' => 'low',
            'due_date' => '2026-09-02'
        ]);

        Task::create([
            'user_id' => $user->id,
            'title' => 'Optimize SQL queries',
            'description' => 'Add indexes fix N+1',
            'status' => 'done',
            'priority' => 'high',
            'due_date' => '2026-08-22'
        ]);
    }
}
