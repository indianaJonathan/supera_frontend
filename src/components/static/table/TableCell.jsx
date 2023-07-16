import "./styles/Table.css";

import React from "react";

function TableCell ({ children }) {
    return (
        <div className="table-cell">
            { children }
        </div>
    );
}

export default TableCell;