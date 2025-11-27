interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SpeciesFilter = ({ value, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
