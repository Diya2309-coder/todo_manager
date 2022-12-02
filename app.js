const { response, request } = require("express")
const express = require("express") //express module
const app = express()//express application
const { Todo } = require("./models")
const bodyParser = require('body-parser')
app.use(bodyParser.json());
// jest.setTimeout(60000);


app.get("/todos", (request, response) =>{ //creating route rout for the express application with simple msg
    // response.send("hello world!")
    console.log("Todo list")
})

app.post("/todos", async(request,response) => {
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
app.put("/todos/:id/markAsCompleted", async(request,responce) => {
    console.log("we have to update a todo with ID: ", request.params.id)
    const todo = await Todo.findByPk(request.params.id)
    try {
        const updatedTodo = await todo.markAsCompleted(request.params.id);
        console.log(updatedTodo);
        return response.json(updatedTodo)
    } catch (error) {
        console.log(error)
        return response.status(422).json(error)
    }
})

app.delete("/todos/:id", (request,responce) => {
    console.log("Delete a todo by ID: ", request.params.id)
})

module.exports = app;   