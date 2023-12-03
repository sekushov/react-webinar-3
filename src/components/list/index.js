import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, elements, actions}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item}
                elements={elements}
                actions={actions}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  })).isRequired,
  elements: PropTypes.array,
  actions: PropTypes.arrayOf(PropTypes.object)
};

List.defaultProps = {
  elements: [],
  actions: []
}

export default React.memo(List);
