import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoView from './components/todoview';

const url = 'http://0.0.0.0:8000';

function App() {
    
    const [todolist, setTodoList] = useState([{}]);
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    // Get all Todo list
    useEffect(() =>
        {
            axios.get(url + '/api/todo')
            .then(res => {
                setTodoList(res.data)
            })
        }
    );

    // Post todo list
    const addTodoHandler = () => {
        axios.post(url + '/api/todo/', {'title': title, 'description': desc})
        .then(res => console.log(res))
    };

    return ( 
        <div className = 'App' >
            <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{'width': '400px', 'backgroundColor': 'white', 'marginTop': '15px'}}>
                <h1 className='card text-white bg-primary mb-1'
                styleName='max-width: 20rem;'>
                    Task Manager
                </h1>
                <h6 className='card text-white bg-primary mb-1' styleName='max-width: 20rem;'>
                    FastApi and MongoDB
                </h6>
                <div className='card-body'>
                   <span className='card-body'>
                        <h5 className='card text-white bg-dark mb-1' styleName=''>
                            Add youre task
                        </h5>      
                        <input className='mb-2 form-control titleIn' onChange={event => setTitle(event.target.value)} placeholder='Title'/>
                        <input  className='mb-2 form-control descIn' onChange={event => setDesc(event.target.value)} placeholder='Description'/>
                        <button className='btn btn-outline-primary mx-2 mb-2' onClick={addTodoHandler}>
                            Add Task
                        </button>
                   </span>

                   <h5 className='card text-white bg-dark mb-1' >
                       Youre Tasks
                   </h5>
                   <div >
                        <TodoView todolist={todolist}/>
                   </div>
                </div> 
                <h6 className='card text-white bg-warning py-1 mb-0'>
                    Copyright 2022, All rights resolved
                </h6>
            </div>
    
        </div>
    );
}

export default App;