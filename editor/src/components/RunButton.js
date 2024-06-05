import React from "react";

const RunButton = ({onClick, children}) => {
    return (
        <button className="execute-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default RunButton;