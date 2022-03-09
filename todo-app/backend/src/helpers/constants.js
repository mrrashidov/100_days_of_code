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
  tagColor: {
    red: 1,
    green: 2,
    blue: 3,
    yellow: 4,
    purple: 5,
    orange: 6,
    pink: 7,
    black: 8,
    white: 9,
  },
  getKeyByValue: function (object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  },
};
