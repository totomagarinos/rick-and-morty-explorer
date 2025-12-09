interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SpeciesFilter = ({ value, onChange }: Props) => {
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
      <option value="">All Species</option>
      <option value="human">Human</option>
      <option value="alien">Alien</option>
      <option value="humanoid">Humanoid</option>
      <option value="robot">Robot</option>
      <option value="cronenberg">Cronenberg</option>
      <option value="animal">Animal</option>
    </select>
  );
};
