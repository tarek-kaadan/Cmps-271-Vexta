import React from 'react';

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PaginationControls: React.FC<Props> = ({ page, totalPages, setPage }) => {
  const handlePrev = () => setPage(Math.max(page - 1, 1));
  const handleNext = () => setPage(Math.min(page + 1, totalPages));

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={handlePrev}
        disabled={page === 1}
        style={{ borderRadius: '30px', border: 'none' }}
      >
        Prev
      </button>
      <span style={{ margin: '0 15px' }}>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        style={{ borderRadius: '30px', border: 'none' }}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
