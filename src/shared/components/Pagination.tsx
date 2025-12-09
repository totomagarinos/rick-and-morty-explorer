interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`px-6 py-2 rounded-xl font-bold transition-all duration-200 ${
          isFirstPage
            ? "bg-gray-700 text-gray-500 cursor-not-allowed shadow-inner shadow-black/20"
            : "bg-green-500 text-gray-900 hover:bg-green-400 active:scale-95 cursor-pointer shadow-md shadow-green-500/20"
        }`}
      >
        ← Prev
      </button>

      <div className="px-4 py-2 bg-gray-800 rounded-xl border-2 border-green-500 shadow-lg shadow-green-500/10">
        <span className="text-gray-300 font-medium tracking-wider">
          Page{" "}
          <span className="text-green-400 font-extrabold">{currentPage}</span>{" "}
          of <span className="text-white font-extrabold">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`px-6 py-2 rounded-xl font-bold transition-all duration-200 ${
          isLastPage
            ? "bg-gray-700 text-gray-500 cursor-not-allowed shadow-inner shadow-black/20"
            : "bg-green-500 text-gray-900 hover:bg-green-400 active:scale-95 cursor-pointer shadow-md shadow-green-500/20"
        }`}
      >
        Next →
      </button>
    </div>
  );
};
