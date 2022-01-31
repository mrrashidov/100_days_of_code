/**
 *
 * @param {String} permission
 * @returns Boolean
 */
module.exports = (permission) => (next) => (root, args, context, info) => {
  console.log("args", args);
  console.log("context", context);

  return next(root, args, context, info);
};
