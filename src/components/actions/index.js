import React from "react";
import PropTypes, { object } from 'prop-types';
import './style.css';

// компонент создает блок с кнопками

function Actions({actions, code}) {     // принимаем данные для кнопок и код item
    const addActions = () => {
        for (let i in actions) {
            const onClick = () => {
                actions[i].onClick(code);
            }
            return (
                <button className={'Actions-btn'} onClick={onClick}>
                    {actions[i].name}
                </button>
            )
        }
    }
    
    return (
        <div className='Actions'>
            {addActions()}
        </div>
    )
}

Actions.propTypes = {
    actions: PropTypes.arrayOf(object),
    code: PropTypes.number
};

Actions.defaultProps = {
    actions: []
}

export default React.memo(Actions);