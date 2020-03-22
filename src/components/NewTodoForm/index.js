import React, {useState} from 'react';
import './style.css';

export default function NewTodoForm(props){
  const [newTodo, setNewTodo] = useState({title: '', body: ''});

  let formClasses = [];
  if(!props.showing){
    formClasses.push('hide');
  }

  const handleChange = (evt) => {
    if(evt.target.name === "title"){
      setNewTodo({...newTodo, title: evt.target.value});
    } else {
      setNewTodo({...newTodo, body: evt.target.value});
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.submitTodo(newTodo.title, newTodo.body);
    setNewTodo({title:'', body:''});
  }

  return(
    <div className={["NewTodoForm", ...formClasses].join(' ')} >
      <form
        onSubmit={handleSubmit}
      >
        <input
          className="inputField titleInput"
          placeholder="Title"
          name="title"
          value={newTodo.title}
          onChange={handleChange}
          id="NewTodoInput"
        />
        <textarea
          className="inputField bodyInput"
          placeholder="body"
          name="body"
          value={newTodo.body}
          onChange={handleChange}
          id="NewTodoInput"
        />
        <button>Submit</button>
      </form>
    </div>
  )
}