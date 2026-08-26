<?php

namespace App\Http\Controllers;

use App\Http\Requests\{ RegisterRequest, LoginRequest };
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService)
    {
    }

    // User registration
    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register(
            $request->validated()
        );

        return response()->json([
            'message' => 'Registration successful',
            'user' => new UserResource($result['user']),
            'access_token' => $result['token'],
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ], 201);
    }

    // User login
    public function login(LoginRequest $request)
    {
        $result = $this->authService->login(
            $request->validated()
        );

        return response()->json([
            'message' => 'Login successful',
            'user' => new UserResource($result['user']),
            ...$this->authService->tokenResponse($result['token']),
        ]);
    }

    // Get authenticated user details
    public function me()
    {
        return new UserResource(
            $this->authService->getAuthenticatedUser()
        );
    }

    // User logout
    public function logout()
    {
        $this->authService->logout();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    // Refresh JWT token
    public function refresh()
    {
        $token = $this->authService->refresh();

        return response()->json([
            'message' => 'Token refreshed successfully',
            ...$this->authService->tokenResponse($token),
        ]);
    }

    public function profile()
    {
        return response()->json([
            'status' => true,
            'data' => auth('api')->user(),
        ]);
    }

    public function updateProfile(
        UpdateProfileRequest $request
    ) {
        $user = auth('api')->user();

        $data = $request->validated();

        $updatedUser = $this->authService->updateProfile(
            $user,
            $data
        );

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully',
            'data' => $updatedUser,
        ]);
    }
}
