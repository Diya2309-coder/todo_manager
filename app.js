const { response, request } = require("express")
const express = require("express") //express module
const app = express()//express application
const { Todo } = require("./models")
const bodyParser = require('body-parser')
app.use(bodyParser.json());
// jest.setTimeout(60000);



app.get("/todos", async (request, response) => { //creating route rout for the express application with simple msg
    // response.send("hello guys!")
    console.log("Todo list");
    try {
        const todo = await Todo.getAllTodos();
        return response.json(todo);
    } catch (error) {
        console.log(error)
        return response.status(422).json(error)
    }
});

app.post("/todos", async (request, response) => {
    console.log("Creating a todo", request.body)
    //Todo
    try {
        const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate })
        return response.json(todo)
    } catch (error) {
        console.log(error)
        return response.status(422).JSON(error)
    }
})

//PUT http://mytodoapp.com/todos/123/markAsCompleted
app.put("/todos/:id/markAsCompleted", async (request, response) => {
    console.log("we have to update a todo with ID: ", request.params.id)
    const todo = await Todo.findByPk(request.params.id)
    try {
        const updatedTodo = await todo.markAsCompleted();
        console.log(updatedTodo);
        return response.json(updatedTodo)
    } catch (error) {
        console.log(error)
        return response.status(422).json(error)
    }
})

app.delete("/todos/:id", async (request, response) => {
    console.log("Delete a todo by ID: ", request.params.id)
    
    try {
        const todo = await Todo.findByPk(request.params.id)
        if(todo){
            await todo.delete();
            return response.json(true);
        }else{
            return response.json(false);
        }
    } catch (error) {
        console.log(error)
        return response.status(422).json(error)
    }
})

module.exports = app;   