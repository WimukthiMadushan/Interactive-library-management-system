import React from 'react';
import './BookVisualize.css';
import BookVisualizeByBorrowCat from '../../Components/BookVisualize/VisualizeByBorrowCat/VisualizeByBorrowCat';
import BookVisualizeByState from '../../Components/BookVisualize/VisualizeByBookStates/VisualizeByBookStates';
import BookVisualizeByReserveCat from '../../Components/BookVisualize/VisualizeByReserveCat/VisualizeByReserveCat';
import FlowOfBorrow from '../../Components/BookVisualize/BorrowBooks/FlowOfBorrow';
import TopAuthors from '../../Components/BookVisualize/TopAuthors/TopAuthors';
import TopPublishers from '../../Components/BookVisualize/TopPublishers/TopPublishers';

const BookVisualization = () => {
  return (
    <div className="visualization-page">
      <h1 className="visualization-title">Book Visualization</h1>
      <div className="visualization-cards">
        <div className="card">
          <BookVisualizeByBorrowCat />
        </div>
        <div className="card">
          <BookVisualizeByReserveCat />
        </div>
        <div className="card">
          <TopAuthors />
        </div>
        <div className="card">
          <TopPublishers />
        </div>
        <div className="card">
          <BookVisualizeByState />
        </div>
        <div className="card">
          <FlowOfBorrow />
        </div>
      </div>
    </div>
  );
};

export default BookVisualization;


// import React from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
// } from 'recharts';

// // Sample data for the charts
// const popularBooksData = [
//   { name: 'Book A', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Book B', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'Book C', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'Book D', uv: 2780, pv: 3908, amt: 2000 },
//   { name: 'Book E', uv: 1890, pv: 4800, amt: 2181 },
//   { name: 'Book F', uv: 2390, pv: 3800, amt: 2500 },
//   { name: 'Book G', uv: 3490, pv: 4300, amt: 2100 },
// ];

// const bookAcquisitionData = [
//   { name: 'Jan', books: 30 },
//   { name: 'Feb', books: 20 },
//   { name: 'Mar', books: 50 },
//   { name: 'Apr', books: 40 },
//   { name: 'May', books: 60 },
//   { name: 'Jun', books: 70 },
//   { name: 'Jul', books: 80 },
//   { name: 'Aug', books: 90 },
//   { name: 'Sep', books: 100 },
//   { name: 'Oct', books: 110 },
//   { name: 'Nov', books: 120 },
//   { name: 'Dec', books: 130 },
// ];

// const categoryPopularityData = [
//   { subject: 'Fiction', A: 120, B: 110, fullMark: 150 },
//   { subject: 'Non-Fiction', A: 98, B: 130, fullMark: 150 },
//   { subject: 'Science', A: 86, B: 130, fullMark: 150 },
//   { subject: 'History', A: 99, B: 100, fullMark: 150 },
//   { subject: 'Biography', A: 85, B: 90, fullMark: 150 },
//   { subject: 'Fantasy', A: 65, B: 85, fullMark: 150 },
// ];

// const overdueBooksData = [
//   { name: 'John Doe', book: 'Book A', dueDate: '2023-09-01' },
//   { name: 'Jane Smith', book: 'Book B', dueDate: '2023-09-05' },
//   { name: 'Alice Johnson', book: 'Book C', dueDate: '2023-09-10' },
// ];

// const BookVisualization = () => {
//   return (
//     <>

//       <div className="container p-4 mx-auto">
//         <h1 className="mb-4 text-2xl font-bold">Library Visualization</h1>

//         {/* Bar Chart for Most Popular Books */}
//         <div className="mb-8">
//           <h2 className="mb-2 text-xl font-semibold">Most Popular Books</h2>
//           <BarChart
//             width={600}
//             height={300}
//             data={popularBooksData}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="pv" fill="#8884d8" />
//             <Bar dataKey="uv" fill="#82ca9d" />
//           </BarChart>
//         </div>

//         {/* Table for People Who Didn't Return Books */}
//         <div className="mb-8">
//           <h2 className="mb-2 text-xl font-semibold">Overdue Books</h2>
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border-b">Name</th>
//                 <th className="px-4 py-2 border-b">Book</th>
//                 <th className="px-4 py-2 border-b">Due Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {overdueBooksData.map((entry, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 border-b">{entry.name}</td>
//                   <td className="px-4 py-2 border-b">{entry.book}</td>
//                   <td className="px-4 py-2 border-b">{entry.dueDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Line Chart for Book Acquisition Trends */}
//         <div className="mb-8">
//           <h2 className="mb-2 text-xl font-semibold">Book Acquisition Trends</h2>
//           <LineChart
//             width={600}
//             height={300}
//             data={bookAcquisitionData}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="books" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </div>
//         {/* Radar Chart for Category Popularity */}
//         <div className="mb-8">
//           <h2 className="mb-2 text-xl font-semibold">Category Popularity</h2>
//           <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={categoryPopularityData}>
//             <PolarGrid />
//             <PolarAngleAxis dataKey="subject" />
//             <PolarRadiusAxis />
//             <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//             <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
//             <Legend />
//           </RadarChart>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BookVisualization;