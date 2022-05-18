require("dotenv/config");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const locale = require("./src/locale");
const User = require("./src/models/User");
const {
  UsersResource,
  CompaniesResource,
  JobsResource,
} = require("./src/resources");

// ============================================
// Admin JS
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");

// use mongoose in AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

// config
const adminJSOptions = new AdminJS({
  resources: [UsersResource, CompaniesResource, JobsResource],
  locale,
  rootPath: "/admin",
  branding: {
    logo: "/public/logo.png",
    companyName: "Gestão de Candidatos",
    favicon: "/public/favicon.ico",
    softwareBrothers: false,
  },
});

const router = AdminJSExpress.buildAuthenticatedRouter(adminJSOptions, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});

// ============================================
// Server
const express = require("express");
const server = express();

server.use(adminJSOptions.options.rootPath, router);
server.use("/public", express.static(__dirname + "/public"));

// =============================================
// Run App
const run = async () => {
  await mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await server.listen(5500, () => console.log("Server started"));
};

run();
