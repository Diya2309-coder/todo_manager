const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
const { describe } = require("sequelize/types/query-types");

// const { sequelize } = require("../models/index")(sequelize);
let server, agent;

describe("Todo test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("responds with json at /todos", async () => {
    const response = await agent.post("/todos").send({
      title: "buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(response.statusCode).toBe(302);
  });

  //    test("Mark a todo as complete", async () => {
  //     const response = await agent.post('/todos').send({
  //         title: 'buy milk',
  //         dueDate: new Date().toISOString(),
  //         completed: false
  //     });

  //     const parsedResponse = JSON.parse(response.text);
  //     const todoID = parsedResponse.id;

  //     expect(parsedResponse.completed).toBe(false);

  //     const markCompleteResponse = await agent.put(`/todos/${todoID}/markAsCompleted`).send();
  //     const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
  //     expect(parsedUpdateResponse.completed).toBe(true);
  //    });

  //    test("delete a todo by id", async ()=> {
  //     const response = await agent.post('/todos').send({
  //         title: 'buy milk',
  //         dueDate: new Date().toISOString(),
  //         completed: true
  //     });
  //     const parsedResponse  =JSON.parse(response.text);
  //     const todoID = parsedResponse.id;
  //     // expect(parsedResponse.completed).toBe(true);

  //     const deleteResponse = await  agent.delete(`/todos/${todoID}/delete`).send();
  //     const parsedUpdateResponse =Boolean(deleteResponse.text);
  //     // expect(parsedUpdateResponse.completed).tobe(true)
  //    });
});
