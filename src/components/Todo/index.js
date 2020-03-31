import React from 'react';
import './style.css';

export default function Todo(props){
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
      <p className="Todo-title">
          {(props.title.length > 8 ? 
            props.title.substring(0,8) + '...' : 
            props.title)}
      </p>
      <i 
        className="fa fa-trash-alt Todo-delete alert-text"
        id={`delete-${props.unique}`}
        onClick={handleClick} 
      ></i>
    </div>
  )
}