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
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          isFirstPage
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer"
        }`}
      >
        ← Prev
      </button>

      <div className="px-4 py-2 bg-gray-100 rounded-lg">
        <span className="text-gray-700 font-medium">
          Page <span className="text-blue-600 font-bold">{currentPage}</span> of{" "}
          <span className="text-gray-900 font-bold">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          isLastPage
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer"
        }`}
      >
        Next →
      </button>
    </div>
  );
};
