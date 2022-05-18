const User = require("../models/User");

module.exports = {
  resource: User,
  options: {
    parent: {
      icon: "User",
    },
    properties: {},
  },
};
