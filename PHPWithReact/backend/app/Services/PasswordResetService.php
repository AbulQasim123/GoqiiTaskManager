<?php

namespace App\Services;

use App\Mail\PasswordResetMail;
use App\Models\User;
use App\Repositories\PasswordResetRepository;
use App\Services\AuditLogService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use RuntimeException;

class PasswordResetService
{
    public function __construct(
        private PasswordResetRepository $passwordResetRepository,
        private AuditLogService $auditLogService
    ) {
    }

    public function sendResetLink(string $email): void
    {
        $token = Str::random(64);

        $this->passwordResetRepository->createOrUpdateToken(
            $email,
            Hash::make($token)
        );

        $resetUrl = config('app.frontend_url', 'http://localhost:5173/')
            . '/reset-password?token=' . $token
            . '&email=' . urlencode($email);

        Mail::to($email)->send(
            new PasswordResetMail($resetUrl)
        );

        $user = User::where('email', $email)->firstOrFail();

        // Log Audit

        $this->auditLogService->log(
            $user,
            'forgot_password',
            'User',
            $user->id,
            'Password reset requested'
        );
    }

    public function resetPassword(array $data): void
    {
        $email = $data['email'];
        $token = $data['token'];

        $resetRecord = $this->passwordResetRepository
            ->findByEmail($email);

        if (!$resetRecord) {
            throw new RuntimeException(
                'Invalid or expired reset token'
            );
        }

        if (!Hash::check($token, $resetRecord->token)) {
            throw new RuntimeException(
                'Invalid reset token'
            );
        }

        if (
            Carbon::parse($resetRecord->created_at)
                ->addMinutes(60)
                ->isPast()
        ) {
            $this->passwordResetRepository->deleteByEmail($email);

            throw new RuntimeException(
                'Reset token expired'
            );
        }

        $user = User::where('email', $email)->firstOrFail();

        $this->passwordResetRepository->updatePassword(
            $email,
            Hash::make($data['password'])
        );

        // Log Audit
        $this->auditLogService->log(
            $user,
            'reset_password',
            'User',
            $user->id,
            'Password reset successfully'
        );

        $this->passwordResetRepository->deleteByEmail($email);
    }
}
