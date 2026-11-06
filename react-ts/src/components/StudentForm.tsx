import { useState, useEffect } from 'react';
import type { Student, StudentFormData, Department } from '../types/student';

interface StudentFormProps {
    onSubmit: (data: StudentFormData) => void;
    editingStudent: Student | null;
    onCancelEdit: () => void;
}

export const StudentForm = ({
    onSubmit,
    editingStudent,
    onCancelEdit,
}: StudentFormProps) => {
    const [formData, setFormData] = useState<StudentFormData>({
        name: '',
        email: '',
        age: 18,
        department: 'Computer',
        isActive: true,
        phone: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (editingStudent) {
                setFormData({
                    name: editingStudent.name,
                    email: editingStudent.email,
                    age: editingStudent.age,
                    department: editingStudent.department,
                    isActive: editingStudent.isActive,
                    phone: editingStudent.phone || '',
                });
            } else {
                setFormData({
                    name: '',
                    email: '',
                    age: 18,
                    department: 'Computer',
                    isActive: true,
                    phone: '',
                });
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [editingStudent]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim()) return;

        onSubmit({
            ...formData,
            phone: formData.phone?.trim() ? formData.phone.trim() : undefined,
        });

        setFormData({
            name: '',
            email: '',
            age: 18,
            department: 'Computer',
            isActive: true,
            phone: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
            <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
            <div className="form-grid">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    min={15}
                    max={60}
                    required
                />
                <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                >
                    <option value="Computer">Computer</option>
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical">Mechanical</option>
                </select>
                <input
                    type="text"
                    placeholder="Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    Active
                </label>
            </div>
            <div className="form-buttons">
                <button type="submit" className="btn-primary">
                    {editingStudent ? 'Save Changes' : 'Add Student'}
                </button>
                {editingStudent && (
                    <button type="button" onClick={onCancelEdit} className="btn-secondary">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};