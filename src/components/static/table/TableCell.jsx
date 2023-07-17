import "./styles/Table.css";

import React from "react";

function TableCell ({ children }) {
    return (
        <td className="table-cell">
            { children }
        </td>
    );
}

export default TableCell;