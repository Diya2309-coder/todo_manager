// const { response , request } = require("express")(request,response)
const express = require("express"); //express module
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
const app = express(); //express application
const { Todo } = require("./models");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"));
app.use(csrf({ cookie: true }))
app.use(express.static(path.join(__dirname, "public")))
// jest.setTimeout(60000);


app.set("view engine", "ejs");


app.get("/", async (request, response) => {
  const overdue = await Todo.overdue();
  const dueToday = await Todo.dueToday();
  const dueLater = await Todo.dueLater();
  if (request.accepts("html")) {
    response.render("index", {
      title: "Todo Application",
      overdue,
      dueToday,
      dueLater,
     csrfToken: request.csrfToken(),
    });
  } else {
    response.json({
      overdue,
      dueToday,
      dueLater,
    });
  }
});

// app.get("/", async(request,response) => {
//     const allTodos = await Todo.getTodos();
//     if(request.accepts("html")){
//         response.render('index', {
//             allTodos
//         });
//     }else{
//         response.json({
//             allTodos
//         })
//     }
// });


app.get("/todos", async (request, response) => {
  //creating route rout for the express application with simple msg
  // response.send("hello guys!")
  console.log("Todo list");
  try {
    const todo = await Todo.getAllTodos();
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  console.log("Creating a todo", request.body);
  //Todo
  try {
    await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

//PUT http://mytodoapp.com/todos/123/markAsCompleted
app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("we have to update a todo with ID: ", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    console.log(updatedTodo);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  console.log("Delete a todo by ID: ", request.params.id);
  try {
    await Todo.remove(request.params.id);
    return response.json({ success: true });
  } catch (error) {
    // console.log(error)
    return response.status(422).json(error);
  }
});

module.exports = app;
