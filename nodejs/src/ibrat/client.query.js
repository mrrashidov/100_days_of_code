const createUser = `
  mutation {
    createUser(
      firstName: "New user first name"
      lastName: "New user last name"
      age: 20
    ) {
      id
      fullName {
        firstName
        lastName
      }
      age
    }
  }
`;

const updateUser = `
  mutation {
    updateUser(
      id: 1
      firstName: "Updated user first name"
      lastName: "Updated user last name"
      age: 30
    ) {
      id
      fullName {
        firstName
        lastName
      }
      age
    }
  }
`;

const deleteUser = `
  mutation {
    deleteUser(id: 1){
      id
    }
  }
`;

const createTodo = `
  mutation {
    createTodo(
      title: "New todo title"
      description: "New todo description"
      userId: 1
    ) {
      id
      content {
        title
        description
      }
    }
  }
`;

const updateTodo = `
  mutation {
    updateTodo(
      id: 1
      title: "Updated todo title"
      description: "Updated todo description"
      userId: 1
    ) {
      id
      content {
        title
        description
      }
    }
  }
`;

const deleteTodo = `
  mutation {
    deleteTodo(id: 1){
      id
    }
  }
`;

const me = `
  query {
    me(id: 1){
      fullName {
        firstName
        lastName
      }
      age
    }
  }
`;

const todo = `
  query {
    todo(id: 1){
      content {
        title
        description
      }
      user {
        fullName {
          firstName
          lastName
        }
        age
      }
    }
  }
`;

const todos = `
  query {
    todos(limit: 2){
      content {
        title
        description
      }
      user {
        fullName {
          firstName
          lastName
        }
        age
      }
    }
  }
`;

module.exports = {
  Query: {
    todo,
    todos,
    me,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
    createTodo,
    updateTodo,
    deleteTodo,
  },
};
