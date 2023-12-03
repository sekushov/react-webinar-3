import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import Head from "../head";
import Item from "../item";
import './style.css';

function Modal({cartList, elements, show, actionsItem, actionsModal, resultItem, resultElements}) {
  return (
    <div className='Modal' style={show ? {display: 'flex'} : {display: 'none'}}>
      <div className="Modal-content">
        <Head title='Корзина' actionsHead={actionsModal}/>
        <div className='List-item'>   {/* пустой item для отступа */}
          <Item />
        </div>
        <List list={cartList}
            elements={elements}       /* расположение элементов по столбцам */
            actions={actionsItem}/>   {/* кнопки */}
        <div className="font-bold">
          <Item item={resultItem} elements={resultElements}/>   {/* итоговый результат */}
        </div>
      </div>
        
    </div>
  )
}

Modal.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  })).isRequired,
  show: PropTypes.bool.isRequired,
  elements: PropTypes.array,
  actionsItem: PropTypes.arrayOf(PropTypes.object),
  actionsModal: PropTypes.arrayOf(PropTypes.object),
  resultItem: PropTypes.object,
  resultElements: PropTypes.array
};

Modal.defaultProps = {
  elements: [],
  actionsItem: [],
  actionsModal: [],
  resultItem: {},
  resultElements: []
}

export default React.memo(Modal);