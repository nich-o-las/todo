import React from 'react';
import './style.css';

export default function Todo(props){
  const titleStyle = {textDecoration: "none"};
  if(props.completed) titleStyle.textDecoration = "line-through";
  const handleClick = (evt) => {
    if(evt.target.dataset.type === 'title'){
      props.onClick(props.unique);
    } else {
      props.removeTodo(props.unique);
    }
  }
  return (
    <div className="Todo" onClick={handleClick}>
      <p data-type="title" style={titleStyle}>
          {props.title}
      </p>
      <button onClick={handleClick}>delete</button>
    </div>
  )
}