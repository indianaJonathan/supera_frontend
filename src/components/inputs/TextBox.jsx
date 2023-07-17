import "./styles/TextBox.css";
import React from "react";

import { AiOutlineClose } from "react-icons/ai";

function TextBox ({ onChange, dark, label, value, error, clear }) {
    return (
        <div className="textbox">
            <div className="textbox-label">
                <span className={ `textbox-label-text${ dark ? ' dark' : '' }` }>{ label }</span>
            </div>
            <div className={ `textbox-area${ dark ? '-dark' : '' }` }>
                <input type="text" className={ `textbox-input${ dark ? '-dark' : '' }` } onChange={ onChange } value={value}/>
                <div className="clean-button-area">
                    { value && value.length > 0 ?
                        <button title="Limpar campo" onClick={ clear } className={ `clean-button${ dark ? '-dark': '' }` }>
                            <AiOutlineClose />
                        </button>
                    :
                        null
                    }
                </div>
            </div>
            <div className="textbox-error">
                <span className="textbox-error-text">{ error }</span>
            </div>
        </div>
    );
}

export default TextBox;