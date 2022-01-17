const { login } = require("../actions/user");
module.exports = {
  Query: {
    user: ({ id }) => {
      return "User";
    },
    users: () => {
      return "All users";
    },
  },
  Mutation: {
    login: ({ input }) => {
      return "Login";
    },
    signup: ({ input }) => {
      return "Sign up";
    },
    verification: ({ email, phone }) => {
      return true;
    },
    verify: ({ code }) => {
      return true;
    },
    passwordForgot: ({ email, phone }) => {
      return true;
    },
    passwordRefresh: ({ input }) => {
      return "AuthResponse";
    },
  },
};

/*
login(input: LoginInput!): AuthResponse!
        signup(input: SignupInput!): AuthResponse!
        verification(email:String phone:String):Boolean! #TODO Boolean responselar ozgartirlishi kk
        verify(code:Int!): Boolean! # TODO Boolean
        passwordForgot(email:String phone: String): Boolean! # TODO Boolean
        passwordRefresh(input: PasswordRefresh!):AuthResponse! # TODO Boolean
*/
