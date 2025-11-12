interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, onPageChange }: Props) => {
  return (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)}>← Prev</button>
      <button onClick={() => onPageChange(currentPage + 1)}>Next →</button>
    </div>
  );
};
