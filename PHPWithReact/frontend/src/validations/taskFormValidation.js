import * as yup from 'yup';

export const taskFormSchema = yup.object({
    title: yup.string().min(3, 'Title must be at least 3 characters').max(255, 'Title too long').required('Title is required?'),
    description: yup.string().min(10, 'Description must be at 10 characters').required('Description is required?'),
    status: yup.string().oneOf(['todo', 'in-progress', 'done'], 'Invalid status').required('Status is required?'),
    priority: yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required('Priority is required?'),
    due_date: yup.date().nullable().typeError('Invalid date format'),
}).required();
