export type Department = 'Computer' | 'Civil' | 'Electrical' | 'Mechanical';

export interface Student {
    id: number;
    name: string;
    email: string;
    age: number;
    department: Department;
    isActive: boolean;
    phone?: string;
}

export type StudentFormData = Omit<Student, 'id'>;