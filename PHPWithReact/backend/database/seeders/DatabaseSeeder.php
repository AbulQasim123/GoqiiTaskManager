<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@goqii.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Test User',
            'email' => 'user@goqii.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
        ]);
    }
}
