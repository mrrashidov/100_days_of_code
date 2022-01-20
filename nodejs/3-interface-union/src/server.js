
const { graphql, buildSchema } = require("graphql");
const schema = buildSchema(/* GraphQL */ `
    # UNION
    union SearchResult = User | Todo
    # ENUM TYPES
    enum UserStatus {
        super_admin
        admin
        moderator
        user
    }
    enum TodoType {
        task
        holiday
        meeting
        other
    }
    # USER
    input UserNameInput {
        firstName: String!
        lastName: String
    }
    input CreateUserInput {
        avatar: String!
        name: UserNameInput!
        email: String!
        password: String!
        status: UserStatus = user
    }
    input UpdateUserNameInput {
        firstName: String
        lastName: String
    }
    input UpdateUserInput {
        id: ID!
        avatar: String
        name: UpdateUserNameInput
        email: String
        password: String
        status: UserStatus
    }
    input DeleteUserInput {
        id: ID!
        userId: ID!
    }
    # TODOS
    input CreateTodoInput {
        body: String!
        content: String
        status: Boolean
        type: TodoType = other
        userId: ID!
    }
    input UpdateTodoInput {
        id: ID!
        body: String
        content: String
        status: Boolean
        type: TodoType
    }
    input DeleteTodoInput {
        id: ID!
        userId: ID!
    }
    # INTERFACES
    interface SearchResultInterface {
        id: ID!
    }
    # TYPES
    # TODO
    type Todo implements SearchResultInterface {
        id: ID!
        body: String!
        content: String
        type: TodoType
        status: Boolean
        user: User!
    }
    # USER
    type UserName {
        firstName: String!
        lastName: String
    }
    type User implements SearchResultInterface {
        id: ID!
        avatar: String!
        name: UserName!
        email: String!
        status: UserStatus
        password: String!
    }
    type DeletedUser {
        id: ID!
        userId: ID!
    }
    type DeletedTodo {
        id: ID!
        userId: ID!
    }
    # QUERY
    type Query {
        me(id: ID!): User!
        todo(id: ID!): Todo
        todos: [Todo!]
        search(q: String!): [SearchResult!]
    }
    # MUTATION
    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUser(input: UpdateUserInput!): User!
        deleteUser(input: DeleteUserInput!): DeletedUser!
        createTodo(input: CreateTodoInput!): Todo!
        updateTodo(input: UpdateTodoInput!): Todo!
        deleteTodo(input: DeleteTodoInput!): DeletedTodo!
    }
`);

let data = {
    users: [
        {
            id: 1,
            avatar: "ali",
            name: {
                firstName: "Ali",
                lastName: "Nabiyev",
            },
            email: "ali@mail.ru",
            status: "user",
            password: "12345",
        },
        {
            id: 2,
            avatar: "zafar",
            name: {
                firstName: "Zafar",
                lastName: "Saidov",
            },
            email: "zafar@mail.ru",
            status: "admin",
            password: "12345",
        },
        {
            id: 3,
            avatar: "vali",
            name: {
                firstName: "Vali",
                lastName: "Soliyev",
            },
            email: "vali@mail.ru",
            status: "user",
            password: "12345",
        },
    ],
    todos: [
        {
            id: 1,
            body: "Read the book",
            content: "content1",
            status: true,
            type: "other",
            userId: 2,
        },
        {
            id: 2,
            body: "Do homeworks",
            content: "content2",
            status: true,
            type: "meeting",
            userId: 1,
        },
        {
            id: 3,
            body: "Have a rest",
            content: "content3",
            status: true,
            type: "other",
            userId: 1,
        },
        {
            id: 4,
            body: "Learn English",
            content: "content4",
            status: true,
            type: "other",
            userId: 3,
        },
        {
            id: 5,
            body: "Graphql",
            content: "content3",
            status: true,
            type: "other",
            userId: 2,
        },
    ],
};

const resolversRoot = {
    me: ({ id }) => {
        const user = data.users.find((user) => user.id === parseInt(id));
        return user;
    },

    todo: ({ id }) => {
        const todo = data.todos.find((todo) => todo.id === parseInt(id));
        const user = data.users.find((user) => user.id === parseInt(todo.userId));
        return {
            id: todo.id,
            body: todo.body,
            content: todo.content,
            status: todo.status,
            type: todo.type,
            user: user,
        };
    },

    todos: () => {
        const result = data.todos.map((todo) => {
            const user = data.users.find((user) => user.id === parseInt(todo.userId));
            return {
                id: todo.id,
                body: todo.body,
                content: todo.content,
                status: todo.status,
                type: todo.type,
                user: user,
            };
        });
        return result;
    },

    search: ({ q }) => {
        const result = [];
        data.users.forEach((user) => {
            if (
                user.avatar.toLowerCase().includes(q.toLowerCase()) ||
                user.name.firstName.toLowerCase().includes(q.toLowerCase()) ||
                user.name.lastName.toLowerCase().includes(q.toLowerCase()) ||
                user.email.toLowerCase().includes(q.toLowerCase()) ||
                user.status.toLowerCase().includes(q.toLowerCase())
            ) {
                result.push(user);
            }
        });
        data.todos.forEach((todo) => {
            if (
                todo.body.toLowerCase().includes(q.toLowerCase()) ||
                todo.content.toLowerCase().includes(q.toLowerCase()) ||
                todo.type.toLowerCase().includes(q.toLowerCase())
            ) {
                result.push(todo);
            }
        });
        console.log(result);
        return result;
    },

    createUser: ({ input }) => {
        const newUser = {
            id: data.users.length + 1,
            avatar: input.avatar,
            name: {
                firstName: input.name.firstName,
                lastName: input.name.lastName,
            },
            email: input.email,
            status: input.status,
            password: input.password,
        };
        data.users.push(newUser);
        return newUser;
    },

    updateUser: ({ input }) => {
        const index = data.users.findIndex(
            (user) => user.id === parseInt(input.id)
        );
        if (!index) return "User not found";
        if (input.avatar) {
            data.users[index].avatar = input.avatar;
        }
        if (input.name.firstName) {
            data.users[index].name.firstName = input.name.firstName;
        }
        if (input.name.lastName) {
            data.users[index].name.lastName = input.name.lastName;
        }
        if (input.email) {
            data.users[index].email = input.email;
        }
        if (input.status) {
            data.users[index].status = input.status;
        }
        if (input.password) {
            data.users[index].password = input.password;
        }
        return data.users[index];
    },

    deleteUser: ({ input }) => {
        const index = data.users.findIndex(
            (user) => user.id === parseInt(input.id)
        );
        if (index < 0) return { id: -1, userId: input.userId };
        const id = data.users[index].id;
        data.users.splice(index, 1);
        return {
            id,
            userId: input.userId,
        };
    },

    createTodo: ({ input }) => {
        const newTodo = {
            id: data.todos.length + 1,
            body: input.body,
            content: input.content,
            status: input.status || true,
            type: input.type,
            userId: input.userId,
        };
        data.todos.push(newTodo);
        const user = data.users.find((user) => user.id === parseInt(input.userId));
        return {
            id: newTodo.id,
            body: newTodo.body,
            content: newTodo.content,
            status: newTodo.status,
            type: newTodo.type,
            user: user,
        };
    },

    updateTodo: ({ input }) => {
        const index = data.todos.findIndex(
            (todo) => todo.id === parseInt(input.id)
        );
        if (!index) return "Todo not found";
        if (input.body) {
            data.todos[index].body = input.body;
        }
        if (input.content) {
            data.todos[index].content = input.content;
        }
        if (input.type) {
            data.todos[index].type = input.type;
        }
        if (input.status !== null) {
            data.todos[index].status = input.status;
        }
        const user = data.users.find(
            (user) => user.id === parseInt(data.todos[index].userId)
        );
        return {
            id: data.todos[index].id,
            body: data.todos[index].body,
            content: data.todos[index].content,
            status: data.todos[index].status,
            type: data.todos[index].type,
            user: user,
        };
    },

    deleteTodo: ({ input }) => {
        const index = data.todos.findIndex(
            (todo) => todo.id === parseInt(input.id)
        );
        const userIndex = data.users.findIndex(
            (user) => user.id === parseInt(input.userId)
        );
        if (index < 0 && userIndex < 0) return { id: index, userId: userIndex };
        if (index < 0 && userIndex > 0)
            return { id: index, userId: data.users[userIndex].id };
        if (index > 0 && userIndex < 0)
            return { id: data.todos[index].id, userId: userIndex };
        const id = data.todos[index].id;
        data.todos.splice(index, 1);
        return {
            id,
            userId: input.userId,
        };
    },
};

// ===================================================================

// TODO

// graphql(
//   schema,
//   `
//     {
//       todo(id: 3) {
//         id
//         body
//         content
//         status
//         user {
//           id
//           email
//           avatar
//           name {
//             firstName
//             lastName
//           }
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data.todo));

// TODOS

// graphql(
//   schema,
//   `
//     {
//       todos {
//         id
//         body
//         content
//         status
//         type
//         user {
//           id
//           avatar
//           email
//           name {
//             firstName
//           }
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data.todos));

// ME;

// graphql(
//   schema,
//   `
//     {
//       me(id: 1) {
//         id
//         avatar
//         name {
//           firstName
//           lastName
//         }
//         email
//         status
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// UPDATE USER

// graphql(
//   schema,
//   `
//     mutation {
//       updateUser(input: { id: 2, name: {}, email: "user2@mail.ru" }) {
//         id
//         avatar
//         name {
//           firstName
//           lastName
//         }
//         status
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// CREATE USER

// graphql(
//   schema,
//   `
//     mutation {
//       createUser(
//         input: {
//           avatar: "user"
//           name: { firstName: "User", lastName: "lastUser" }
//           email: "user3@mail.ru"
//           status: moderator
//           password: "12345"
//         }
//       ) {
//         id
//         avatar
//         name {
//           firstName
//           lastName
//         }
//         status
//         email
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// DELETE USER

// graphql(
//   schema,
//   `
//     mutation {
//       deleteUser(input: { id: 1, userId: 2 }) {
//         id
//         userId
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// UPDATE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       updateTodo(input: { id: 2, body: "Updated body", status: false }) {
//         id
//         body
//         content
//         status
//         type
//         user {
//           id
//           avatar
//           email
//           name {
//             firstName
//           }
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// CREATE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       createTodo(
//         input: {
//           body: "Body of todo"
//           content: "New_content"
//           status: false
//           type: holiday
//           userId: 2
//         }
//       ) {
//         id
//         content
//         status
//         type
//         user {
//           id
//           avatar
//           name {
//             lastName
//           }
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));

// DELETE TODO

// graphql(
//   schema,
//   `
//     mutation {
//       deleteTodo(input: { id: 4, userId: 2 }) {
//         id
//         userId
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response));

// SEARCH

// graphql(
//   schema,
//   `
//     {
//       search(q: "user") {
//         __typename
//         ... on User {
//           id
//           avatar
//           name {
//             firstName
//           }
//           email
//           status
//         }
//         ... on Todo {
//           id
//           body
//           content
//         }
//       }
//     }
//   `,
//   resolversRoot
// ).then((response) => console.log(response.data));
