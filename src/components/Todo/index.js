import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Todo(props){
  const titleStyle = {textDecoration: "none"};
  if(props.completed) titleStyle.textDecoration = "line-through";
  const handleClick = (evt) => {
    if(evt.target.id=== `delete-${props.unique}`) {
      console.log('clicked delete')
      props.removeTodo(props.unique);
    } else{
      props.onClick(props.unique);
      console.log('clicked title')
    }
  }
  return (
    <div className="Todo" onClick={handleClick}>
      <p data-type="Todo-title" style={titleStyle}>
          {props.title}
      </p>
      <button
        onClick={handleClick} 
        className="Todo-delete"
        id={`delete-${props.unique}`}
      >
         <FontAwesomeIcon  icon={faTrash} />
      </button>
    </div>
  )
}