import "./styles/Button.css";

import React from "react";

function Button ({ children, type, style, onClick }) {
    return (
        <button type={ type ? type : "button" } className={ `button${style ? ' ' + style : ' primary'}` } onClick={ onClick }>
            { children }
        </button>
    );
}

export default Button;