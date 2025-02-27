import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            <ul className="tab-list">
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={`tab-item ${activeTab === index ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;