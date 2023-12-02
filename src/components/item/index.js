import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    },
    showElement: () => {
      if (props.elements) {
        for (let i of props.elements) {
          switch (props.elements) {
            case 'amount': 
              return (
                <div className='Item-amount'>{props.item.amount}&nbsp;шт</div>
              );
          }
        }
      }
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{props.item.price.toLocaleString()}&nbsp;&#8381;</div>
      {callbacks.showElement()}
      <div className='Item-actions'>
        <button onClick={callbacks.onAdd}>
          {props.itemBtnText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
  onAdd: () => {
  }
}

export default React.memo(Item);
