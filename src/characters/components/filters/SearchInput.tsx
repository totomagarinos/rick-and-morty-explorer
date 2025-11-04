interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
