import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';


function Controls({cartList/* , onAdd */}) {
  const countCartAmount = () => {
    let  cartAmount = 0;
    cartList.forEach(item => cartAmount += item.amount);
    return cartAmount ? `${cartAmount} ${plural(cartAmount, {
      one: 'товар',
      few: 'товара',
      many: 'товаров'
    })}` : 'пусто'
  };
  const countCartPrice = () => {
    let cartPrice = 0;cartList.forEach(item => cartPrice += item.price * item.amount);
    return cartPrice.toLocaleString() + ' ₽'
  }
  return (
    <div className='Controls'>
      <div>В корзине:&nbsp;</div>
      <div className={'Controls-item'}>{
        countCartAmount() !== 'пусто' 
        ? countCartAmount() + ' / ' + countCartPrice() 
        : countCartAmount()
      }</div>
      {/* <button onClick={() => onAdd()}>Перейти</button> */}
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
