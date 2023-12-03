import React, {useState} from "react";
import PropTypes, { number } from "prop-types";
import Actions from "../actions";
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
    /* showElement: (el) => {
      if (props.elements) {
        for (let i of props.elements) {
          switch (i) {
            case el === 'code': 
              return (
                props.item.code
              );
            case 'amount': 
              return (
                <div className='Item-amount'>{props.item.amount}&nbsp;шт</div>
              );
            case 'result': 
              return (
                <div className='Item-result'>{props.item.result}&nbsp;&#8381;</div>
              );
          }
        }
      }
    } */
    showItemProp: (num) => {
      if (props.elements) {
        switch (props.elements[num]) {
          case 'price': return (<div className={'Item-' + num}>{props.item[props.elements[num]].toLocaleString()}&nbsp;&#8381;</div>)
          case 'amount': return (<div className={'Item-' + num}>{props.item[props.elements[num]]}&nbsp;шт</div>)
          default: return (<div className={'Item-' + num}>{props.item[props.elements[num]]}</div>)
        }
      }
    }
  }

  return (
    <div className={'Item'}>
      {callbacks.showItemProp(0)}
      {callbacks.showItemProp(1)}
      {callbacks.showItemProp(2)}
      {callbacks.showItemProp(3)}
      <div className="Item-4">
        <Actions actions={props.actions} code={props.item.code}/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
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
