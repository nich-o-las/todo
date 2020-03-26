import React, {useState, useEffect} from 'react';
import './style.css';
import NewTodoForm from '../NewTodoForm';
import Todo from '../Todo';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function TodoList(){
  const [todos, setTodos] = useState({});
  const [active, setActive] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('reactTodos'));
    if(stored){
      setTodos({...stored});
      //setActive(stored[Object.keys(stored)[0]]);
    }
  }, []);

  useEffect(()=>{
    if(todos){
      const updated = JSON.stringify(todos);
      localStorage.setItem('reactTodos', updated);
    }
    if(!todos.length){
      setEditing(false);
    }
  }, [todos]);

  const createTodo = (title, body) => {
    const newId = uuidv4();
    setTodos({...todos, [newId]: {body, title, id: newId, completed: false}});
    setEditing(false);
  }

  const deleteTodo = (id) => {
    const updated = {...todos};
    delete updated[id];
    setTodos(updated);
  }

  const changeTodo = (title, body, id) => {
    const updated = {...todos};
    updated[id] = {...active, title, body}
    setTodos(updated);
  }

  const completeTodo = (id) => {
    const updated = {...todos}
    updated[id] = {...updated.id, completed: true};
    setTodos(updated);
  }
  
  const displayList = () => {
    if(todos){
      return (
        Object.keys(todos).map((key) => {
          return (
                    <Todo 
                      key={todos[key].id} 
                      unique={todos[key].id}
                      completed={todos[key].completed}
                      removeTodo={deleteTodo}
                      title={todos[key].title}
                      onClick={changeActive}
                    />)
        })
      )
    } else {
      return(
        <div>
          No Notes!
        </div>
      )
    }
  }

  const displayActive = () => {
    if(active && editing){
      return(
        <div className="TodoList-activeNote">
          <form
            onSubmit={handleSubmit}
          >
            <input 
              className="titleInput"
              type="text" 
              value={active.title} 
              name="title"
              onChange={handleChange}
            />
            <textarea 
              className="bodyInput"
              value={active.body} 
              name='body'
              onChange={handleChange}
            />
            <span 
              className="deleteActive" 
              onClick={handleClick} 
              id={`delete-active-${active.id}`}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <button onClick={handleClick}>
              complete
            </button>
          </form>
        </div>
      )
    }
  }

  const changeActive = (id) => {
    setActive(todos[id]);
    setEditing(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    changeTodo(active.title, active.body, active.id);
  }

  const handleClick = (evt) => {
    if(evt.target.innerText === "complete"){
      completeTodo(active.id);
      console.log('complete')
    } else if(evt.target.id ===  `delete-active-${active.id}`){
      console.log('delete')
      deleteTodo(active.id);
    }
  }

  const handleChange = (evt) => {
    if(evt.target.name === "body"){
      setActive({...active, body: evt.target.value});
      setTodos({...todos, [active.id] : {...active, body: evt.target.value}})
    } else {
      setActive({...active, title: evt.target.value});
      setTodos({...todos, [active.id] : {...active, title: evt.target.value}})
    }
  }

  const newBtn = () => {
    if(editing){
      return(
        <h3
          className="TodoList-newBtn"
          onClick={()=>setEditing(false)}
        >
          new item
        </h3>
      )
    }
  }
  
  return(
    <div className="TodoList">
      <div className="TodoList-header">
        <h1>Note Taker</h1>
        {newBtn()}
      </div>
      <div className="TodoList-container">
        <div className="TodoList-list">
          {displayList()}
        </div>
        <div className="TodoList-edit">
          <NewTodoForm 
            showing={!editing}
            submitTodo={createTodo}
          />
          {displayActive()}
        </div>
      </div>
    </div>
  )
}