import { useState, useEffect, useMemo } from 'react';
import type { Student, StudentFormData } from './types/student';
import { StudentForm } from './components/StudentForm';
import { StudentList } from './components/StudentList';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';

const STORAGE_KEY = 'assignment_students_list';

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const handleSaveStudent = (formData: StudentFormData) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...formData, id: s.id } : s))
      );
      setEditingStudent(null);
    } else {
      const newEntry: Student = {
        id: Date.now(),
        ...formData,
      };
      setStudents((prev) => [...prev, newEntry]);
    }
  };

  const handleDeleteStudent = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = deptFilter === 'ALL' || s.department === deptFilter;
      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'active' && s.isActive) ||
        (statusFilter === 'inactive' && !s.isActive);

      return matchSearch && matchDept && matchStatus;
    });
  }, [students, searchTerm, deptFilter, statusFilter]);

  const metrics = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.isActive).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [students]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Management System (React + TS)</h1>
        <div className="badge-group">
          <span className="badge">Total: {metrics.total}</span>
          <span className="badge active-badge">Active: {metrics.active}</span>
          <span className="badge inactive-badge">Inactive: {metrics.inactive}</span>
        </div>
      </header>

      <StudentForm
        onSubmit={handleSaveStudent}
        editingStudent={editingStudent}
        onCancelEdit={() => setEditingStudent(null)}
      />

      <div className="filter-section">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar
          department={deptFilter}
          status={statusFilter}
          onDepartmentChange={setDeptFilter}
          onStatusChange={setStatusFilter}
        />
      </div>

      <StudentList
        students={filteredStudents}
        onEdit={setEditingStudent}
        onDelete={handleDeleteStudent}
        onToggleStatus={handleToggleStatus}
        onViewDetails={setSelectedStudent}
      />

      {selectedStudent && (
        <div className="modal-backdrop" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Student Details</h3>
            <p><strong>ID:</strong> {selectedStudent.id}</p>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Age:</strong> {selectedStudent.age}</p>
            <p><strong>Department:</strong> {selectedStudent.department}</p>
            <p><strong>Status:</strong> {selectedStudent.isActive ? 'Active' : 'Inactive'}</p>
            {selectedStudent.phone && <p><strong>Phone:</strong> {selectedStudent.phone}</p>}
            <button onClick={() => setSelectedStudent(null)} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}