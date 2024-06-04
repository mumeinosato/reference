import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

const TabContent = ({ id, activeTab, children }) => {
    return (
        <div
            id={id}
            className={classnames("tab-content-item", {
                "hidden": id !== activeTab,
            })}
        >
            {children}
        </div>
    );
};

TabContent.propTypes = {
    id: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default TabContent;
