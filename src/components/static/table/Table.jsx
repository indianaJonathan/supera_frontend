import "./styles/Table.css";

import React from "react";

function Table ({ children, dark, headers }) {
    return (
        <div className={`table${ dark ? '-dark' : '' }`}>
          <table className="table-area">
            <thead>
              <tr className={ `table-header${ dark ? '-dark' : '' }` }>
                { headers.map( (item, index) => {
                    return (
                        <th key={index}>{item}</th>
                    );
                } )}
              </tr>
            </thead>
            <tbody>
                { children }
            </tbody>
          </table>
        </div>
    );
}

export default Table;