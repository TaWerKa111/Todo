import TodoItem from "./todolist";

function TodoView(props){
    return(
        <div>
            <ul>
                {props.todolist.map(todo => <TodoItem todo = {todo}/>)}
            </ul>
        </div>
    )
}

export default TodoView;