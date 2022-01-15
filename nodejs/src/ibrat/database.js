module.exports = {
  users: [
    {
      id: 1,
      fullName: {
        firstName: "Ibrat",
        lastName: "Tillaberdiyev",
      },
      age: 20,
    },
    {
      id: 2,
      fullName: {
        firstName: "Murod",
        lastName: "Islomov",
      },
      age: 18,
    },
  ],
  todos: [
    {
      id: 1,
      content: {
        title: "Users Service",
        description: "Users serviceda getUserById'ni yozish kerak kerak.",
      },
      userId: 2,
      priority: "High",
    },
    {
      id: 2,
      content: {
        title: "Products Service",
        description: "Products serviceda getCountOfProducts'ni yozish kerak.",
      },
      userId: 1,
      priority: "Low",
    },
  ],
};
