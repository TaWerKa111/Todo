import axios from "axios";
import React from "react";

function TodoItem(props){
    const deletTodoHandler = (title) => {
        axios.delete(`http://0.0.0.0:8000/api/todo/${title}`)
        .then(res => console.log(res))}
        return  (
            <div>
                <p>
                    <span style={{ fontWeight: 'bold, underline'}}>{ props.todo.title} :</span>{props.todo.desc} 
                    <button onClick={() => deletTodoHandler(props.todo.title)} className='btn btn-outline-danger my-2 mx-2' style={{'border-radius':'50px'}}></button>
                    <hr></hr>
                </p>
            </div>
        )
} 
export default TodoItem;