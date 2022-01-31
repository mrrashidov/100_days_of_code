module.exports = {
  model_type: {
    user: 1,
    team: 2,
  },
  status: {
    active: 1,
    passive: 2,
    pending: 3,
    draft: 4,
  },
  getKeyByValue: function (object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  },
};
