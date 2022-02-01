const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const usernameToFind = request.headers.username;

  const userNameExist = users.find((user) => user.username === usernameToFind);

  if (userNameExist) {
    request.user = userNameExist;
    return next();
  }

  return response.status(404).json({ error: "User does not exists" });
}

app.post("/users", (request, response) => {
  const user = {
    id: uuidv4(),
    name: request.body.name,
    username: request.body.username,
    todos: [],
  };

  users.push(user);

  return response.json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
