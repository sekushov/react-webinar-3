import React from "react";
import PropTypes from "prop-types";
import Actions from "../actions";
import './style.css';

function Head({title, actionsHead}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <Actions actions={actionsHead}/>  {/* кнопка в шапке модалки */}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  actionsHead: PropTypes.arrayOf(PropTypes.object)
};

Head.defaultProps = {
  actionsHead: []
}

export default React.memo(Head);