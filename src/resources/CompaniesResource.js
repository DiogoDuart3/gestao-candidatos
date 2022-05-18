const Company = require("../models/Company");

module.exports = {
  resource: Company,
  options: {
    parent: {
      icon: "Enterprise",
    },
    properties: {
      _id: {
        isVisible: false,
      },
      description: {
        type: "richtext",
        isVisible: { list: false, show: true, edit: true },
      },
      created_at: {
        isVisible: { edit: false, list: true, show: true, filter: true },
      },
    },
  },
};
