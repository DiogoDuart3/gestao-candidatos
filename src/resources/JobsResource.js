const Job = require("../models/Job");

module.exports = {
  resource: Job,
  options: {
    parent: {
      icon: "Book",
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
