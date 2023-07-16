import "./styles/Table.css";

import React from "react";

function Table ({ children, dark, headers }) {
    return (
        <div className={`table${ dark ? '-dark' : '' }`}>
          <div className="table-area">
            <div className={ `table-header${ dark ? '-dark' : '' }` }>
              { headers.map( (item) => {
                  return (
                      <div>{item}</div>
                  );
              } )}
            </div>
            <tbody>
                { children }
            </tbody>
          </div>
        </div>
    );
}

export default Table;