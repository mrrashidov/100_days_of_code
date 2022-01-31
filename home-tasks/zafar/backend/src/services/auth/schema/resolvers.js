const {
    login,
    signup,
    verification,
    verify,
    user,
  } = require("../actions/user"),
  { forgot, refresh } = require("../actions/password");

module.exports = {
  Mutation: {
    login: (parent, context, root, args) => login(parent, context, root, args),
    signup: (parent, context, root, args) =>
      signup(parent, context, root, args),
    verification: (parent, context, root, args) =>
      verification(parent, context, root, args),
    verify: (parent, context, root, args) =>
      verify(parent, context, root, args),
    passwordForgot: (parent, context, root, args) =>
      forgot(parent, context, root, args),
    passwordRefresh: (parent, context, root, args) =>
      refresh(parent, context, root, args),
  },
};
