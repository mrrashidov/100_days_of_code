const { login } = require("../actions/user");
module.exports = {
  Query: {},
  Mutation: {
    login: () => login(),
  },
};
