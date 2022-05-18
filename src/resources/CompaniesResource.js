const uploadFeature = require("@adminjs/upload");

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
      logoLocation: {
        mimeType: {},
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
  features: [
    uploadFeature({
      provider: { local: { bucket: "public" } },
      properties: {
        key: "logoLocation",
        mimeType: "mimeType",
      },
    }),
  ],
};
