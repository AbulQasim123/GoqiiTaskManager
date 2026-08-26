<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('api')->check();
    }

    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'required',
                'string',
            ],

            'status' => [
                'sometimes',
                'in:todo,in-progress,done',
            ],

            'priority' => [
                'sometimes',
                'in:low,medium,high',
            ],

            'due_date' => [
                'nullable',
                'date',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Title is required.',
            'title.string' => 'Title must be a string.',
            'title.max' => 'Title cannot exceed 255 characters.',

            'description.required' => 'Description is required.',
            'description.string' => 'Description must be a string.',
            'status.in' => 'Status must be one of the following: todo, in-progress, done.',
            'priority.in' => 'Priority must be one of the following: low, medium, high.',
            'due_date.date' => 'Due date must be a valid date.',
        ];
    }

}
