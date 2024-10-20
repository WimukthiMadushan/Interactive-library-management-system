import connection from "./../DataBase.js";
import {
    promisify
} from "util";
import { subDays, subMonths, subYears, format } from 'date-fns';

const query = promisify(connection.query).bind(connection); // Convert query to return Promises

// Helper function for sending formatted responses
const sendResponse = (res, status, message, data = {}) => {
    return res.status(status).json({
        message,
        ...data
    });
};


export const getTopAuthors = async (req, res) => {
    const {
        top = 10, range = 'lastMonth'
    } = req.query; // Default to top 10 authors and last month

    // Determine the date range based on the specified range
    let dateCondition;
    if (range === 'lastMonth') {
        dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
    } else if (range === 'last6Months') {
        dateCondition = "DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
    } else {
        return sendResponse(res, 400, "Invalid range parameter");
    }

    const queryStr = `
      SELECT 
        a.Author_ID,
        a.First_Name,
        a.Last_Name,
        COALESCE(SUM(borrow_count), 0) AS BorrowCount,
        COALESCE(SUM(reserve_count), 0) AS ReserveCount,
        COALESCE(SUM(borrow_count), 0) + COALESCE(SUM(reserve_count), 0) AS TotalCount
      FROM 
        Author a
      LEFT JOIN (
        SELECT 
          bc.Book_ID,
          COUNT(b.Borrow_ID) AS borrow_count
        FROM 
          Borrow b
        JOIN 
          Book_Copy bc ON b.Book_ID = bc.Copy_ID
        WHERE 
          b.Borrow_Date >= ${dateCondition}
        GROUP BY 
          bc.Book_ID
      ) AS borrow_data ON a.Author_ID = (SELECT Author FROM Book WHERE Book_ID = borrow_data.Book_ID)
      LEFT JOIN (
        SELECT 
          bc.Book_ID,
          COUNT(r.Reserve_ID) AS reserve_count
        FROM 
          Reserve r
        JOIN 
          Book_Copy bc ON r.Book_ID = bc.Copy_ID
        WHERE 
          r.Reserve_Date >= ${dateCondition}
        GROUP BY 
          bc.Book_ID
      ) AS reserve_data ON a.Author_ID = (SELECT Author FROM Book WHERE Book_ID = reserve_data.Book_ID)
      GROUP BY 
        a.Author_ID, a.First_Name, a.Last_Name
      ORDER BY 
        TotalCount DESC
      LIMIT ${parseInt(top, 10)}
    `;

    try {
        const result = await query(queryStr);
        return sendResponse(res, 200, "Top authors retrieved successfully", {
            authors: result
        });
    } catch (err) {
        console.error("Database error: ", err);
        return sendResponse(res, 500, "Internal server error");
    }
};


export const getTopPublishers = async (req, res) => {
  const {
    top = 10, range = 'lastMonth'
  } = req.query; // Default to top 10 publishers and last month

  // Determine the date range based on the specified range
  let dateCondition;
  if (range === 'lastMonth') {
    dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
  } else if (range === 'last6Months') {
    dateCondition = "DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
  } else {
    return res.status(400).json({
      message: "Invalid range parameter"
    });
  }

  const queryStr = `
    SELECT 
      p.Publisher_ID, 
      p.Publisher_First_Name, 
      p.Publisher_Last_Name,
      COALESCE(SUM(borrow_count), 0) AS BorrowCount, 
      COALESCE(SUM(reserve_count), 0) AS ReserveCount, 
      COALESCE(SUM(borrow_count), 0) + COALESCE(SUM(reserve_count), 0) AS TotalCount 
    FROM 
      Publisher p 
    LEFT JOIN (
      SELECT 
        bc.Book_ID, 
        COUNT(b.Borrow_ID) AS borrow_count 
      FROM 
        Borrow b 
      JOIN 
        Book_Copy bc ON b.Book_ID = bc.Copy_ID 
      WHERE 
        b.Borrow_Date >= ${dateCondition} 
      GROUP BY 
        bc.Book_ID 
    ) AS borrow_data ON p.Publisher_ID = (SELECT Publisher FROM Book WHERE Book_ID = borrow_data.Book_ID) 
    LEFT JOIN (
      SELECT 
        bc.Book_ID, 
        COUNT(r.Reserve_ID) AS reserve_count 
      FROM 
        Reserve r 
      JOIN 
        Book_Copy bc ON r.Book_ID = bc.Copy_ID 
      WHERE 
        r.Reserve_Date >= ${dateCondition} 
      GROUP BY 
        bc.Book_ID 
    ) AS reserve_data ON p.Publisher_ID = (SELECT Publisher FROM Book WHERE Book_ID = reserve_data.Book_ID) 
    GROUP BY 
      p.Publisher_ID, p.Publisher_First_Name,p.Publisher_Last_Name
    ORDER BY 
      TotalCount DESC 
    LIMIT 
      ${parseInt(top, 10)}
  `;

  connection.query(queryStr, (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
    return res.status(200).json({
      publishers: result
    });
  });
};


export const getBorrowedBooksInRange = (req, res) => {
  const { range } = req.params;

  let startDate;
  const endDate = format(new Date(), 'yyyy-MM-dd');
  let sqlQuery;

  switch (range) {
    case 'last7days':
      startDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');
      sqlQuery = `
        SELECT DATE(Borrow_Date) AS date, COUNT(*) AS borrowedCount
        FROM Borrow
        WHERE Borrow_Date BETWEEN ? AND ?
        GROUP BY DATE(Borrow_Date)
        ORDER BY DATE(Borrow_Date)
      `;
      break;
    case 'lastMonth':
      startDate = format(subMonths(new Date(), 1), 'yyyy-MM-dd');
      sqlQuery = `
        SELECT DATE(Borrow_Date) AS date, COUNT(*) AS borrowedCount
        FROM Borrow
        WHERE Borrow_Date BETWEEN ? AND ?
        GROUP BY DATE(Borrow_Date)
        ORDER BY DATE(Borrow_Date)
      `;
      break;
    case 'lastYear':
      startDate = format(subYears(new Date(), 1), 'yyyy-MM-dd');
      sqlQuery = `
        SELECT DATE_FORMAT(Borrow_Date, '%Y-%m') AS date, COUNT(*) AS borrowedCount
        FROM Borrow
        WHERE Borrow_Date BETWEEN ? AND ?
        GROUP BY DATE_FORMAT(Borrow_Date, '%Y-%m')
        ORDER BY DATE_FORMAT(Borrow_Date, '%Y-%m')
      `;
      break;
    default:
      return res.status(400).json({ success: false, message: "Invalid date range option" });
  }

  connection.query(sqlQuery, [startDate, endDate], (err, result) => {
    if (err) {
      console.error("Error fetching borrowed books in date range:", err);
      return res.status(500).send("Internal Server Error");
    } else {
      return res.status(200).json(result);
    }
  });
};


export const bookVisualizeByCat = (req, res) => {
  const sqlQuery = `
    SELECT 
      c.Cat_Name, 
      COUNT(bw.Borrow_id) AS borrowedCount
    FROM 
      Borrow bw
    JOIN 
      Book_Copy bc ON bw.Book_ID = bc.Copy_ID
    JOIN 
      Book b ON bc.Book_ID = b.Book_ID
    JOIN 
      Category c ON b.Category = c.Cat_ID
    GROUP BY 
      c.Cat_Name;
  `;

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error fetching borrowed books by category:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
};

export const bookVisualizeByStates = (req, res) => {
  const sqlQuery = `
    SELECT 'borrow' AS table_name, isComplete, COUNT(*) AS count
    FROM Borrow
    GROUP BY isComplete

    UNION ALL

    SELECT 'reserve' AS table_name, isComplete, COUNT(*) AS count
    FROM Reserve
    GROUP BY isComplete
  `;

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error fetching book completion states:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
};


export const reservebookVisualizeByCat = (req, res) => {
  const sqlQuery = `
    SELECT 
      c.Cat_Name, 
      COUNT(r.Reserve_id) AS reservedCount
    FROM 
      Reserve r
    JOIN 
      Book_Copy bc ON r.Book_ID = bc.Copy_ID
    JOIN 
      Book b ON bc.Book_ID = b.Book_ID
    JOIN 
      Category c ON b.Category = c.Cat_ID
    GROUP BY 
      c.Cat_Name;
  `;

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error fetching reserved books by category:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
};