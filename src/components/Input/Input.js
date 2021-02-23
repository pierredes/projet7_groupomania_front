import React from 'react';

import './Input.css';

const input = (props) => {
    let elementInput = null;
    
    switch(props.inputtype) {
        case('input'):
            elementInput = <input className='inputElement' {...props} />
            break;
        case('textarea'):
            elementInput = <textarea className='inputElement' {...props} />
            break;
        default: 
            elementInput = <input className='inputElement' {...props} />
    }

    return (
        <div className='input'>
            <label className="label">{props.label}</label>
            {elementInput}
        </div>

    )
}

export default input;