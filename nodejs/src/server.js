const { graphql, buildSchema } = require("graphql");
const schema = buildSchema(/* GraphQL */ `
  union SearchResult = Product | User
  enum UserGender {
    ayol
    erkak
  }
  enum StatusEnum {
    active
    pending
    passive
    block
  }

  input UserNameInput {
    nick: String
    first: String
    last: String
  }

  input CreateUserInput {
    name: UserNameInput!
    email: String!
    password: String!
    avatar: String
    gender: UserGender
    status: StatusEnum = "pending"
  }

  input CreateProductInput {
    name: String!
    price: Int!
  }

  input UpdateProductInput {
    id: ID!
    name: String
    price: Int
  }

  type Product implements SearchResultInterface {
    id: ID!
    name: String
    price: Float
  }

  type UserName {
    nick: String
    first: String
    last: String
  }

  interface SearchResultInterface {
    id: ID!
  }
  type User implements SearchResultInterface {
    id: ID!
    fullName: UserName
    avatar: String
    gender: UserGender
    status: StatusEnum
  }

  type UserProducts {
    count: Int
    products: [Product!]
  }

  type UserResponse {
    id: ID
    user: User
    items: UserProducts
  }

  type Query {
    hello: String!
    me: UserResponse!
    product(id: Int!): Product! # Object | null
    products(page_size: Int, page_number: Int): [Product!]
    search(q: String!): [SearchResult!]
  }
  type Mutation {
    createUser(input: CreateUserInput!): User!
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
  }
`);

const data = {
  users: [
    {
      id: 1,
      avatar:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/12/1264ca0c90886ff9a6ab015cfc286b08b8657874_full.jpg",
      firstName: "John",
      lastName: "Doe",
      nick: "john",
      gender: "erkak",
      status: "active",
    },
    {
      id: 2,
      avatar:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/12/1264ca0c90886ff9a6ab015cfc286b08b8657874_full.jpg",
      firstName: "Jane",
      lastName: "Doe",
      nick: "jane",
      gender: "ayol",
      status: "pending",
    },
  ],
  products: [
    {
      id: 1,
      name: "First Product",
      price: 10.99,
    },
    {
      id: 2,
      name: "Second Product",
      price: 3.99,
    },
    {
      id: 3,
      name: "Third Product",
      price: 2.99,
    },
    {
      id: 4,
      name: "Fourth Product",
      price: 1.99,
    },
  ],
  user_products: [
    {
      user_id: 1,
      product_id: 1,
    },
    {
      user_id: 1,
      product_id: 4,
    },
  ],
};

const paginate = (array, page_size, page_number) =>
  array.slice(page_number * page_size, page_number * page_size + page_size);
const resolversRoot = {
  hello: () => "Hello World",
  me: () => ({
    id: data.users[0].id,
    user: {
      id: data.users[0].id,
      avatar: data.users[0].avatar,
      name: {
        nick: data.users[0].nick,
        first: data.users[0].firstName,
        last: data.users[0].lastName,
      },
      gender: data.users[0].gender,
      status: data.users[0].status,
    },
    items: {
      count: data.user_products.length,
      products: data.user_products.map((up) =>
        data.products.find((product) => product.id === up.product_id)
      ),
    },
  }),
  product: ({ id }) =>
    data.products.find((product) => product.id === parseInt(id)),
  products: ({ page_size, page_number }) =>
    paginate(data.products, parseInt(page_size), parseInt(page_number) - 1),
  search: ({ q }) => {
    console.log("query", q);
    const result = [];
    data.products.forEach((product) => {
      if (product.name.toLowerCase().includes(q.toLowerCase())) {
        result.push(product);
      }
    });
    data.users.forEach((user) => {
      if (user.nick.toLowerCase().includes(q.toLowerCase())) {
        result.push(user);
      }
    });
    console.log(result);
    return result;
  },
  createProduct: ({ input }) => {
    const newData = {
      id: data.products.length + 1,
      name: input.name,
      price: input.price,
    };
    data.products.push(newData);
    return newData;
  },
  updateProduct: ({ input }) => {
    const findIndex = data.products.findIndex(
      (product) => product.id === parseInt(input.id)
    );
    data.products[findIndex].name = input.name;
    return data.products.find((product) => product.id === parseInt(input.id));
  },
  createUser: ({ input }) => {
    const newData = {
      id: data.users.length + 1,
      avatar: input.avatar,
      firstName: input.name.first,
      lastName: input.name.last,
      nick: input.name.nick,
    };
    data.users.push(newData);
    return {
      id: newData.id,
      name: input.name,
      avatar: input.avatar,
      gender: input.gender,
      status: input.status,
    };
  },
  SearchResult: (parent) => {
    console.log(parent);
  },
};
graphql(
  schema,
  `
    mutation {
      createUser(
        input: {
          name: { nick: "zafar", first: "Zafar", last: "Alimov" }
          email: "zafar@yopmail.com"
          password: "password"
          avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/12/1264ca0c90886ff9a6ab015cfc286b08b8657874_full.jpg"
          gender: erkak
        }
      ) {
        id
        name {
          nick
          first
          last
        }
      }
    }
  `,
  resolversRoot
).then((response) => console.log(response));
graphql(
  schema,
  `
    {
      search(q: "john") {
        __typename
        ... on User {
          id
          fullName {
            first
          }
        }
        ... on Product {
          id
          name
          price
        }
      }
    }
  `,
  resolversRoot
).then((response) => console.log(response));
