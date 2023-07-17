import "./styles/Table.css";

import React from "react";

function TableRow ({ children, dark }) {
    return (
        <tr className={ `table-row${ dark ? '-dark' : '' }` }>
            { children }
        </tr>
    );
}

export default TableRow;