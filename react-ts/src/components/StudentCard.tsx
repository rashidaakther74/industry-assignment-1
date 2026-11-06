import type { Student } from '../types/student';

interface StudentCardProps {
    student: Student;
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
    onViewDetails: (student: Student) => void;
}

export const StudentCard = ({
    student,
    onEdit,
    onDelete,
    onToggleStatus,
    onViewDetails,
}: StudentCardProps) => {
    return (
        <div className={`card ${student.isActive ? 'active' : 'inactive'}`}>
            <h4>{student.name}</h4>
            <p><strong>Dept:</strong> {student.department}</p>
            <p><strong>Status:</strong> {student.isActive ? 'Active' : 'Inactive'}</p>
            <div className="card-buttons">
                <button onClick={() => onViewDetails(student)} className="btn-info">
                    Details
                </button>
                <button onClick={() => onToggleStatus(student.id)} className="btn-toggle">
                    Status
                </button>
                <button onClick={() => onEdit(student)} className="btn-edit">
                    Edit
                </button>
                <button onClick={() => onDelete(student.id)} className="btn-delete">
                    Delete
                </button>
            </div>
        </div>
    );
};