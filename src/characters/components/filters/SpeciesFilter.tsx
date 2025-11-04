interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SpeciesFilter = ({ value, onChange }: Props) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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
