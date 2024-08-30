import React, { useState ,useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Filters.css';
import Select from "react-select";
import { StoreContext } from "../../Hooks/StoreContext.jsx";
import { Range, getTrackBackground } from 'react-range';
5001
const Filters = ({togglePopup,onApply}) => {
  const { categoryFilters } = useContext(StoreContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [categories, setCategories] = useState([]);
  const [rangeValues, setRangeValues] = useState([0, 5]);


  const handleClear = (field) => {
    switch (field) {
      case 'dateRange':
        setStartDate(null);
        setEndDate(null);
        break;
      case 'categories':
        setCategories([]);
        break;
      case 'rangeValues':
        setRangeValues([0, 5]);
        break;
      default:
        break;
    }
  };
  const handleCategoryChange = (selectedOptions) => {
    setCategories(selectedOptions || []);
  };

  const formatDate = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
  
    return `${year}-${month}-${day}`;
  };
  

  const handleApply = () => {
    // Handle apply logic
    let data = {
      start :formatDate(startDate),
      end : formatDate(endDate),
      category: categories,
      range: rangeValues
    }
    //console.log(data);
    onApply(data);
    togglePopup();
  };

  return (
    <div className="container">
      <div className="title">
        Advanced Filters
      </div>
      <div className="input-group">
        <div className="input-group-title">
          <label className="label">Published Date</label>
          <span className="clear-button" onClick={() => handleClear('dateRange')}>
            Clear
          </span>
        </div>
        <div className="date-range">
          <div className="input-group-date">
            <label className="date-label">From</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="mm/dd/yyyy"
              className="date-picker"
            />
          </div>
          <div className="input-group-date">
            <label className="date-label">To</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="mm/dd/yyyy"
              className="date-picker"
            />
          </div>
        </div>
      </div>

      <div className="input-group">
        <div className="input-group-title">
          <label className="label">Categories</label>
          <span className="clear-button" onClick={() => handleClear('categories')}>
            Clear
          </span>
        </div>

        <Select
          className="select"
          options={categoryFilters}
          isMulti
          placeholder="Select Category"
          onChange={handleCategoryChange}
        />
        
      </div>

      <div className="input-group">
        <div className="input-group-title">
          <label className="label">Reviews</label>
          <span className="clear-button" onClick={() => handleClear('rangeValues')}>
            Clear
          </span>
        </div>
        <Range
          values={rangeValues}
          step={1}
          min={0}
          max={5}
          onChange={(values) => setRangeValues(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: rangeValues,
                    colors: ['#ccc', '#fbb033', '#ccc'],
                    min: 0,
                    max: 5
                  }),
                  alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props }) => {
            const { key, ...restProps } = props; 
            return (
                <div
                    key={key} 
                    {...restProps} 
                    style={{
                    ...restProps.style,
                    height: '16px',
                    width: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#fbb033',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 2px 6px #AAA'
                    }}
                >
              <div
                style={{
                  position: 'absolute',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: '#fbb033',
                  width: 'fit-content',
                }}
              >
                {rangeValues[index].toFixed(1)}
              </div>
            </div>
            );
          }}
        />
      </div>

      <div className="button-group">
        <button className="button cancel-button" onClick={togglePopup}>
          Cancel
        </button>
        <button className="button apply-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  ); 
}; 

export default Filters;
