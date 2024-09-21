import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs-container">
      <div
        id="first1"
        className={`tab1 ${activeTab === 'users' ? 'active' : ''}`}
        data-testid="tab-users-container"
      >
        <div
          id="first"
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
          data-testid="tab-users"
        >
          Users
        </div>
      </div>
      <div
        className={`tab1 ${activeTab === 'staff' ? 'active' : ''}`}
        data-testid="tab-staff-container"
      >
        <div
          className={`tab ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
          data-testid="tab-staff"
        >
          Staff
        </div>
      </div>
    </div>
  );
};

export default Tabs;
