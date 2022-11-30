const dayjs = require("dayjs");
const { v4: uuid } = require("uuid");

const createEntity = (entityInput) => ({
  ...entityInput,
  createdAt: dayjs().toISOString(),
  id: uuid(),
});

const createTodo = (userId, text, complete = false) => createEntity({ userId, text, complete });

const createUser = (login, password) => createEntity({ login, password });

module.exports = () => {
  const database = {
    todos: [],
    users: [],
  };

  const dummyUser = createUser("dummy", "password");
  database.users = [dummyUser, createUser("unused", "password")];

  database.todos = [
    createTodo(dummyUser.id, "Brew cup of coffee", true),
    createTodo(dummyUser.id, "Research `redux-toolkit-query`"),
    createTodo(dummyUser.id, "Check HackerNews", true),
    createTodo(dummyUser.id, "Throw out cup of coffee"),
  ];

  return database;
};
