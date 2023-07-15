import "./styles/Datepicker.css";

import React from "react";

function Datepicker ({ onChange, value, max, dark, label, error }) {
    return (
        <div className="datepicker">
            <div className="datepicker-label">
                <span className={ `datepicker-label-text${ dark ? ' dark' : '' }` }>{ label }</span>
            </div>
            <div className={ `datepicker-area${ dark ? '-dark' : '' }` }>
                <input type="date" max={ max } value={ value } onChange={ onChange } className={ `datepicker-input${ dark ? '-dark' : '' }` }/>
            </div>
            <div className="datepicker-error">
                <span className="datepicker-error-text">{ error }</span>
            </div>
        </div>
    );
}

export default Datepicker;