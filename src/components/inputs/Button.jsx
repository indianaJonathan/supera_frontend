import "./styles/Button.css";

import React from "react";

function Button ({ children, type, style, onClick, dark }) {
    return (
        <button type={ type ? type : "button" } className={ `button${style ? ' ' + style : ' primary' }${dark ? '-dark' : ''}` } onClick={ onClick }>
            { children }
        </button>
    );
}

export default Button;