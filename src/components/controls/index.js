import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({cartList, onAdd}) {
  return (
    <div className='Controls'>
      <div>В корзине:</div>
      <div>{
        (() => {
          let  cartAmount = 0;
          cartList.forEach(item => {
            cartAmount += item.amount;
          });
          return cartAmount ? cartAmount : 'пусто'
        })()
      }</div>
      <button onClick={() => onAdd()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cartList: PropTypes.array,
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  cartList: () => {},
  onAdd: () => {}
}

export default React.memo(Controls);
