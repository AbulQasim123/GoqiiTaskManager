<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TaskIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth('api')->check();
    }

    public function rules(): array
    {
        return [
            'status' => [
                'nullable',
                'in:todo,in-progress,done',
            ],

            'per_page' => [
                'nullable',
                'integer',
                'min:1',
                'max:100',
            ],
        ];
    }

    public function perPage(): int
    {
        return (int) $this->input('per_page', 10);
    }

    public function status(): ?string
    {
        return $this->input('status');
    }
}
