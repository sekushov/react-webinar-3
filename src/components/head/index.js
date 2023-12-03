import React from "react";
import PropTypes from "prop-types";
import Actions from "../actions";
import './style.css';

function Head({title, actionsHead}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <Actions actions={actionsHead}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);