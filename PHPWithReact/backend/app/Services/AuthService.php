<?php

namespace App\Services;

use App\Models\User;
use App\Services\AuditLogService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{

    public function __construct(
        private readonly AuditLogService $auditLogService,
    ) {
    }
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'] ?? 'user',
        ]);

        // Log Audit
        $this->auditLogService->log(
            $user,
            'register',
            'User',
            $user->id,
            'User registered'
        );

        $token = auth('api')->login($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function login(array $credentials): array
    {
        if (!$token = auth('api')->attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }
        $user = auth('api')->user();

        // Log Audit
        $this->auditLogService->log(
            $user,
            'login',
            'User',
            $user->id,
            'User logged in'
        );

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function logout(): void
    {
        $user = auth('api')->user();

        // Log Audit

        $this->auditLogService->log(
            $user,
            'logout',
            'User',
            $user->id,
            'User logged out'
        );

        auth('api')->logout();
    }

    public function refresh(): string
    {
        $user = auth('api')->user();

        // Log Audit

        $this->auditLogService->log(
            $user,
            'refresh',
            'User',
            $user->id,
            'Access token Revoked'
        );

        return auth('api')->refresh();
    }

    public function getAuthenticatedUser(): User
    {
        return auth('api')->user();
    }

    public function tokenResponse(string $token): array
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ];
    }

    public function updateProfile(User $user, array $data): User
    {
        $passwordChanged = !empty($data['password']);

        $user->name = $data['name'];
        $user->email = $data['email'];

        if ($passwordChanged) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        $description = $passwordChanged
            ? 'Profile and password updated'
            : 'Profile updated';

        $this->auditLogService->log(
            $user,
            'profile_update',
            'User',
            $user->id,
            $description
        );

        return $user->fresh();
    }
}
