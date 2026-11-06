interface FilterBarProps {
    department: string;
    status: string;
    onDepartmentChange: (dept: string) => void;
    onStatusChange: (status: string) => void;
}

export const FilterBar = ({
    department,
    status,
    onDepartmentChange,
    onStatusChange,
}: FilterBarProps) => {
    return (
        <div className="filter-bar">
            <select
                value={department}
                onChange={(e) => onDepartmentChange(e.target.value)}
            >
                <option value="ALL">All Departments</option>
                <option value="Computer">Computer</option>
                <option value="Civil">Civil</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
            </select>

            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="ALL">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
    );
};