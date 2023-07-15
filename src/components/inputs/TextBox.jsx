import "./styles/TextBox.css";
import React from "react";

function TextBox ({ onChange, dark, label, value, error }) {
    return (
        <div className="textbox">
            <div className="textbox-label">
                <span className={ `textbox-label-text${ dark ? ' dark' : '' }` }>{ label }</span>
            </div>
            <div className={ `textbox-area${ dark ? '-dark' : '' }` }>
                <input type="text" className={ `textbox-input${ dark ? '-dark' : '' }` } onChange={ onChange } value={value}/>
            </div>
            <div className="textbox-error">
                <span className="textbox-error-text">{ error }</span>
            </div>
        </div>
    );
}

export default TextBox;