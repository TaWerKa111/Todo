from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Todo

# App object
app = FastAPI()

from database import (
    fetch_all_todos, 
    fetch_one_todo,
    delete_todo,
    update_todo,
    create_todo,
)


origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/')
async def index():
    return {'message': 'Hello world!'}


@app.get('/api/todo')
async def get_todo():
    response = await fetch_all_todos()
    return response


@app.get('/api/todo/{title}', response_model=Todo)
async def get_todo_by_id(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"Нет тудушек с таким {title}!") 


@app.post('/api/todo', response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if response:
            return response
    HTTPException(400, "Что-то пошло не так!")


@app.put('/api/todo/{title}/', response_model=Todo)
async def put_todo(title:str, desc:str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"Нет тудушек с таким {title}!") 


@app.delete('/api/todo/{title}')
async def delete_todo_by_title(title):
    response = await delete_todo(title)
    if response:
        return "Удаление прошло успешно"
    raise HTTPException(404, f"Нет тудушек с таким {title}!") 