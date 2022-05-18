const { ValidationError } = require("adminjs");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  resource: User,
  options: {
    parent: {
      icon: "User",
    },
    properties: {
      encryptedPassword: {
        isVisible: false,
      },
      password: {
        type: "string",
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false,
        },
      },
    },
    actions: {
      new: {
        before: async (request) => {
          if (request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: await bcrypt.hash(
                request.payload.password,
                10
              ),
              password: undefined,
            };
          } else {
            throw new ValidationError({
              password: { message: "Não pode ser vazio" },
            });
          }
          return request;
        },
      },
      delete: {
        isAccessible: ({ record }) => {
          return record.params.role !== "admin";
        },
      },
    },
  },
};
