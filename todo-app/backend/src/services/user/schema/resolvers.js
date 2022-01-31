const permission = require("../actions/permission"),
  role = require("../actions/role"),
  user = require("../actions/user"),
  { can } = require("../../../helpers"),
  { status: ss, getKeyByValue } = require("../../../helpers/constants");
module.exports = {
  Role: {
    id: ({ id }) => id,
    name: ({ name }) => name,
    description: ({ description }) => description,
    status: ({ status }) => getKeyByValue(ss, status),
  },
  User: {
    id: ({ id }, args, context) => id,
    name: ({ username, first_name, last_name }, args, context) => ({
      first: first_name,
      last: last_name,
      name: username,
    }),
    status: ({ status }, args, context) => getKeyByValue(ss, status),
  },
  Query: {
    permission: can("any")((parent, context, root, args) =>
      permission.find(parent, context, root, args)
    ),
    permissions: (parent, context, root, args) =>
      permission.list(parent, context, root, args),
    role: (parent, context, root, args) =>
      role.find(parent, context, root, args),
    roles: (parent, context, root, args) =>
      role.list(parent, context, root, args),
    user: (parent, context, root, args) =>
      user.find(parent, context, root, args),
    users: (parent, context, root, args) =>
      user.list(parent, context, root, args),
  },
  Mutation: {
    createPermission: (parent, context, root, args) =>
      permission.create(parent, context, root, args),
    updatePermission: (parent, context, root, args) =>
      permission.update(parent, context, root, args),
    deletePermission: (parent, context, root, args) =>
      permission.delete(parent, context, root, args),
    createRole: (parent, context, root, args) =>
      role.create(parent, context, root, args),
    updateRole: (parent, context, root, args) =>
      role.update(parent, context, root, args),
    deleteRole: (parent, context, root, args) =>
      role.delete(parent, context, root, args),
  },
};
