import "./styles/Card.css";

import React from "react";

function Card ({ label, value, dark }) {
    function transformCurrency (v) {
        return v.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
    return (
        <div className={ `card${ dark ? '-dark' : '' }` }>
            <span className="card-label">{ label }:</span>
            <span className="card-value">{ transformCurrency(value) }</span>
        </div>
    );
}

export default Card;