import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddReserve.css";
import axios from "axios";

function AddReserve({
  closePopup,
  selectedCopyId,
  userId,
  handleCancelReservation,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const times = Array.from(
    { length: 24 },
    (_, i) => i.toString().padStart(2, "0") + ":00"
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(userId, selectedCopyId, selectedDate, startTime, endTime);
    try {
      const response = await axios.post(`http://localhost:5000/api/reserve`, {
        UserID: userId,
        Copy_ID: selectedCopyId,
        isComplete: 0,
        Reserve_Date: selectedDate,
        Reserve_Time: startTime,
        Reserve_End_Time: endTime,
      });
      closePopup();
    } catch (error) {
      console.log("Error fetching data:", error.message);
      alert("Error reserving book. Please try again later.");
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h2>Select Date & Time</h2>
          <button className="dialog-close" onClick={closePopup}>
            &times;
          </button>
        </div>
        <div className="dialog-body">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={selectedDate || ""}
              onChange={(e) => handleDateChange(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start-time">Start Time</label>
              <select
                id="start-time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="form-control"
              >
                <option value="">Select start time</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="end-time">End Time</label>
              <select
                id="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="form-control"
              >
                <option value="">Select end time</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <button className="btn btn-ghost" onClick={handleCancelReservation}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReserve;
