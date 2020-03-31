import React from 'react';
import './style.css';

export default function Todo(props){
  const titleStyle = {textDecoration: "none"};
  if(props.completed) titleStyle.textDecoration = "line-through";
  const handleClick = (evt) => {
    if(evt.target.classList.contains('Todo-delete')) {
      console.log('clicked button')
      props.removeTodo(props.unique);
    } else{
      props.onClick(props.unique);
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
        <i className="fa fa-trash-alt Todo-delete alert-text"></i>
      </button>
    </div>
  )
}