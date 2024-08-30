import React from 'react';
import "./Tabs.css";

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
      <div className="tabs-container">
        <div id='first1' className={`tab1 ${activeTab === 'users' ? 'active' : ''}`}>
            <div id='first'
                className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
            >
            Users
            </div>
        </div>
        <div  className={`tab1 ${activeTab === 'staff' ? 'active' : ''}`}>
            <div
                className={`tab ${activeTab === 'staff' ? 'active' : ''}`}
                onClick={() => setActiveTab('staff')}
            >
            Staff
            </div>
        </div>
        
      </div>
    );
  };

export default Tabs;
