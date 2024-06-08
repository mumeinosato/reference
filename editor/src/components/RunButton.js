import React from "react";

const RunButton = ({onClick, children, isRunning }) => {
    return (
        <button className="execute-button" onClick={onClick}  disabled={isRunning}>
            {children}
        </button>
    );
};

export default RunButton;