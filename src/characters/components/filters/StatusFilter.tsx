interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const StatusFilter = ({ value, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        appearance-none w-full px-4 py-3 
        bg-gray-700 text-white 
        border border-gray-600 rounded-xl 
        focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 
        transition-all duration-200
      "
    >
      <option value="">All Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
  );
};
