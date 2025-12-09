interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-4 py-3 
          bg-gray-700 text-white 
          border border-gray-600 rounded-xl 
          placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 
          transition-all duration-200
        "
      />
    </div>
  );
};
