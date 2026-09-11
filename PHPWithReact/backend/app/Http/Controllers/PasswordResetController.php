<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\PasswordResetService;

class PasswordResetController extends Controller
{
<<<<<<< HEAD
    public function __construct(private PasswordResetService $passwordResetService)
    {
    }
=======
    public function __construct(private PasswordResetService $passwordResetService) {}
>>>>>>> 9bf5941 (unused namespace removed)

    public function forgot(ForgotPasswordRequest $request)
    {
        $this->passwordResetService->sendResetLink(
            $request->validated('email')
        );

        return response()->json([
            'status' => true,
            'message' => 'Password reset link sent to your email',
        ]);
    }

    public function reset(ResetPasswordRequest $request)
    {
        $this->passwordResetService->resetPassword(
            $request->validated()
        );

        return response()->json([
            'status' => true,
            'message' => 'Password reset successfully',
        ]);
    }
}
