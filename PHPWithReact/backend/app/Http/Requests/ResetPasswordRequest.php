<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email is required?',
            'email.email' => 'Please enter a valid email address',
            'email.exists' => 'email id is not exists',

            'token.required' => 'Token is required',
            'token.string' => 'Token should be string',

            'password.required' => 'Token is required',
            'password.string' => 'Token is required',
            'password.min' => 'Token is required',
        ];
    }
}
