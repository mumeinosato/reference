import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Tab = ({ tabs, activeTab, onTabClick, children }) => {
  return (
    <div className="tab-container w-full bg-[#1e1e1e] border-t-2 border-[#232323]">
      <ul className="tab">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              className={classnames(
                { "active-tab": tab.id === activeTab },
                "text-[#cccccc] p-2"
              )}
              onClick={() => {
                onTabClick(tab.id)
              }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">{children}</div>
    </div>
  );
};

Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tab;