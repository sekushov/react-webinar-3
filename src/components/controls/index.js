import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import './style.css';

// отображает количество товаров и сумму в корзине

function Controls({cartList}) {
  const countCartAmount = () => {     // считаем количество
    let  cartAmount = 0;
    cartList.forEach(item => cartAmount += item.amount);
    return cartAmount ? `${cartAmount} ${plural(cartAmount, {
      one: 'товар',
      few: 'товара',
      many: 'товаров'
    })}` : 'пусто'
  };
  const countCartPrice = () => {      // считаем стоимость
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
    </div>
  )
}

Controls.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default React.memo(Controls);
