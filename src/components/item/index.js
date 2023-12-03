import React from "react";
import PropTypes from "prop-types";
import Actions from "../actions";
import './style.css';

function Item(props) {
  const callbacks = {
    showItemProp: (num) => {    // формируем отображение элементов
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
      {/* отображаем элементы по столбцам */}
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
  }),
  elements: PropTypes.array,
  actions: PropTypes.arrayOf(PropTypes.object)
};

Item.defaultProps = {
  item: {},
  elements: [],
  actions: []
}

export default React.memo(Item);
