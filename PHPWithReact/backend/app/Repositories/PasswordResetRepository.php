<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class PasswordResetRepository
{
    public function createOrUpdateToken(
        string $email,
        string $token
    ): void {
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => $token,
                'created_at' => now(),
            ]
        );
    }

    public function findByEmail(string $email)
    {
        return DB::table('password_reset_tokens')
            ->where('email', $email)
            ->first();
    }

    public function updatePassword(
        string $email,
        string $password
    ): void {
        User::where('email', $email)->update([
            'password' => $password,
        ]);
    }

    public function deleteByEmail(string $email): void
    {
        DB::table('password_reset_tokens')
            ->where('email', $email)
            ->delete();
    }
}
