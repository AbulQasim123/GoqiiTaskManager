<?php

use App\Http\Controllers\{
    AuditLogController,
    AuthController,
    PasswordResetController,
    TaskController,
};
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordResetController::class, 'forgot']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    Route::get('/audit-logs', [AuditLogController::class, 'index']);
    Route::get('/audit-logs/actions', [AuditLogController::class, 'actions']);

    Route::get('/tasks/stats', [TaskController::class, 'stats']);
    Route::apiResource('/tasks', TaskController::class);
});
