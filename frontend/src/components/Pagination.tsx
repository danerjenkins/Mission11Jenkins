interface PaginationProps {
  pageNum: number;
  totalPages: number;
  pageSize: number;
  orderBy:string;
  setPageNum: (newPage: number) => void;
  setPageSize: (newSize: number) => void;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
}
const Pagination = ({
  pageNum,
  totalPages,
  pageSize,
  orderBy,
  setPageNum,
  setPageSize,
  setOrderBy
}: PaginationProps) => {
    const toggleSort = () => {
        setOrderBy((prev) => (prev === "Title" ? "BookID" : "Title"));
      };
  return (
    <>
      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-4">
        <div className="btn-group">
          <button
            className="btn btn-outline-primary"
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn ${pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPageNum(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-primary"
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Page size selector and sorting */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="form-group">
          <label htmlFor="pageSize" className="form-label me-2">
            Results per page:
          </label>
          <select
            id="pageSize"
            className="form-select d-inline-block w-auto"
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <button className="btn btn-secondary" onClick={toggleSort}>
          Toggle Sort ({orderBy})
        </button>
      </div>
    </>
  );
};
export default Pagination;
