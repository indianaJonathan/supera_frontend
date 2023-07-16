import "./styles/Table.css";

import React from "react";

function TableRow ({ children, dark }) {
    return (
        <div className={ `table-row${ dark ? '-dark' : '' }` }>
            { children }
        </div>
    );
}

export default TableRow;