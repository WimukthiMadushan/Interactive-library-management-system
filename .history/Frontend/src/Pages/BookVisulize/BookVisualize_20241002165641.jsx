import React from 'react';
import './BookVisualize.css';
import BookVisualizeByBorrowCat from '../../Components/BookVisualize/VisualizeByBorrowCat/VisualizeByBorrowCat';
import BookVisualizeByState from '../../Components/BookVisualize/VisualizeByBookStates/VisualizeByBookStates';
import BookVisualizeByReserveCat from '../../Components/BookVisualize/VisualizeByReserveCat/VisualizeByReserveCat';

const BookVisualization = () => {
  return (
    <div className="visualization-page">
      <h1 className="visualization-title">Book Visualization Dashboard</h1>
      <div className="visualization-cards">
        <div className="card">
          <BookVisualizeByBorrowCat />
        </div>
        {/*<div className="card">
          <BookVisualizeByReserveCat />
        </div>*/}
        <div className="card">
          <BookVisualizeByState />
        </div>
        {/*<div className="card">
          <BookVisualizeByPublishYear />
        </div>*/}
      </div>
    </div>
  );
};

export default BookVisualization;
