interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <input
            type="text"
            placeholder="Search students by name..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-input"
        />
    );
};