import React, {useState, useEffect} from 'react';
import './style.css';
import NewTodoForm from '../NewTodoForm';
import Todo from '../Todo';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function TodoList(){
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(()=>{
    let stored = localStorage.getItem('reactTodos');
    setTodos(JSON.parse(stored));
    setActive(JSON.parse(stored)[0])
  }, []);

  useEffect(()=>{
    let updated = JSON.stringify(todos);
    localStorage.setItem('reactTodos', updated);
    setActive(JSON.parse(updated)[0])
  }, [todos]);

  const createTodo = (title, body) => {
    setTodos([...todos, {body, title, id: uuidv4(), completed: false}]);
    setEditing(false)
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter(i => i.id !== id))
  }
  const changeTodo = (title, body, id) => {
    let newTodos = todos;
    for(let i = 0; i < newTodos.length; i++){
      if(newTodos[i].id === id) {
        newTodos[i].text = title;
        newTodos[i].body = body;
      }
    }
    setTodos([...newTodos]);
  }
  const completeTodo = (id) => {
    let newTodos = todos;
    for(let i = 0; i < newTodos.length; i++){
      if(newTodos[i].id === id) newTodos[i].completed = !newTodos[i].completed;
    }
    setTodos([...newTodos]);
  }
  const displayList = () => {
    return (
      todos.map( (item) => {
        return (
                  <Todo 
                    key={item.id} 
                    unique={item.id}
                    completed={item.completed}
                    removeTodo={deleteTodo}
                    title={item.title}
                    onClick={changeActive}
                  />)
      })
    )
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
            <span onClick={handleClick} data-type="delete">
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <button onClick={handleClick}>
              complete
            </button>
            <FontAwesomeIcon onClick={handleSubmit} icon={faSave} />
          </form>
        </div>
      )
    }
  }

  const changeActive = (id) => {
    const newActive = todos.filter(i => i.id === id);
    setActive(newActive[0]);
    setEditing(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    changeTodo(active.title, active.body, active.id);
  }

  const handleClick = (evt) => {
    if(evt.target.innerText === "complete"){
      completeTodo(active.id);
    } else if(evt.target.innerText === "edit"){
      changeTodo(active.title, active.body, active.id);
    } else if(evt.target.dataset.type === "delete"){
      console.log('delete')
      deleteTodo(active.id);
    }
  }

  const handleChange = (evt) => {
    if(evt.target.name === "body"){
      setActive({...active, body: evt.target.value})}
    else{
      setActive({...active, title: evt.target.value});
    };
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
        <div className="TodoList-newBtnBox">
          {newBtn()}
        </div>
        <h1>Todo List</h1>
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