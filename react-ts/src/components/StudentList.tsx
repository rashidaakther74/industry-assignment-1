import type { Student } from '../types/student';
import { StudentCard } from './StudentCard';

interface StudentListProps {
    students: Student[];
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
    onViewDetails: (student: Student) => void;
}

export const StudentList = ({
    students,
    onEdit,
    onDelete,
    onToggleStatus,
    onViewDetails,
}: StudentListProps) => {
    if (students.length === 0) {
        return <p className="empty-message">No students found.</p>;
    }

    return (
        <div className="student-grid">
            {students.map((student) => (
                <StudentCard
                    key={student.id}
                    student={student}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
};