import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteItem, onSelectItem, onAdd, elements, itemBtnText}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} 
                onDelete={onDeleteItem} 
                onSelect={onSelectItem} 
                onAdd={onAdd} 
                elements={elements}
                itemBtnText={itemBtnText}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onAdd: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onSelectItem: () => {
  },
  onAdd: () => {
  }
}

export default React.memo(List);
