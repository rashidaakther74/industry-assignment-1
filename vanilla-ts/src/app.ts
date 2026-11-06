type Department = 'Computer' | 'Civil' | 'Electrical' | 'Mechanical';

interface Student {
    id: number;
    name: string;
    email: string;
    age: number;
    department: Department;
    isActive: boolean;
    phone?: string;
}

type StudentPayload = Omit<Student, 'id'>;

let students: Student[] = [
    {
        id: 1,
        name: 'Rashida Akther',
        email: 'rashida.codehub@gmail.com',
        age: 20,
        department: 'Computer',
        isActive: true,
    },
    {
        id: 2,
        name: 'Ayesha Akther',
        email: 'ayesha@gmail.com',
        age: 21,
        department: 'Civil',
        isActive: false,
    },
];

const studentList = document.getElementById('student-list') as HTMLDivElement;
const form = document.getElementById('student-form') as HTMLFormElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const filterDept = document.getElementById('filter-dept') as HTMLSelectElement;
const filterStatus = document.getElementById('filter-status') as HTMLSelectElement;

function addStudent(payload: StudentPayload): Student {
    const newStudent: Student = {
        id: Date.now(),
        ...payload,
    };
    students.push(newStudent);
    renderStudents();
    return newStudent;
}

function updateStudent(id: number, fields: Partial<StudentPayload>): Student | undefined {
    const target = findStudentById(id);
    if (!target) return undefined;
    Object.assign(target, fields);
    renderStudents();
    return target;
}

function deleteStudent(id: number): boolean {
    const initialLength = students.length;
    students = students.filter((s) => s.id !== id);
    renderStudents();
    return students.length < initialLength;
}

function findStudentById(id: number): Student | undefined {
    return students.find((s) => s.id === id);
}

function getFilteredStudents(): Student[] {
    const query = searchInput.value.trim().toLowerCase();
    const selectedDept = filterDept.value;
    const selectedStatus = filterStatus.value;

    return students.filter((student) => {
        const matchName = student.name.toLowerCase().includes(query);
        const matchDept = selectedDept === 'ALL' || student.department === selectedDept;
        const matchStatus =
            selectedStatus === 'ALL' ||
            (selectedStatus === 'active' && student.isActive) ||
            (selectedStatus === 'inactive' && !student.isActive);

        return matchName && matchDept && matchStatus;
    });
}

function renderStudents(): void {
    const visibleStudents = getFilteredStudents();
    studentList.innerHTML = '';

    if (visibleStudents.length === 0) {
        studentList.innerHTML = '<p class="empty-state">No students found.</p>';
        return;
    }

    visibleStudents.forEach((student) => {
        const card = document.createElement('div');
        card.className = `card ${student.isActive ? 'active' : 'inactive'}`;
        card.innerHTML = `
      <h3>${student.name}</h3>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Age:</strong> ${student.age}</p>
      <p><strong>Department:</strong> ${student.department}</p>
      <p><strong>Status:</strong> ${student.isActive ? 'Active' : 'Inactive'}</p>
      ${student.phone ? `<p><strong>Phone:</strong> ${student.phone}</p>` : ''}
      <button class="delete-btn" data-id="${student.id}">Delete</button>
    `;
        studentList.appendChild(card);
    });
}

form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const age = Number((document.getElementById('age') as HTMLInputElement).value);
    const department = (document.getElementById('department') as HTMLSelectElement).value as Department;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;

    addStudent({
        name,
        email,
        age,
        department,
        isActive: true,
        phone: phone.trim() ? phone.trim() : undefined,
    });

    form.reset();
});

studentList.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('delete-btn')) {
        const id = Number(target.getAttribute('data-id'));
        deleteStudent(id);
    }
});

searchInput.addEventListener('input', renderStudents);
filterDept.addEventListener('change', renderStudents);
filterStatus.addEventListener('change', renderStudents);

renderStudents();