<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:3',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $this->user()->id,
            ],

            'password' => [
                'nullable',
                'string',
                'min:6',
                'confirmed',
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'name.min' => 'Name must be at least 3 characters.',
            'name.max' => 'Name may not be greater than 255 characters.',

            'email.required' => 'Email is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already registered.',

            'password.min' => 'Password must be at least 6 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
        ];
    }

}
