const mongoose = require("mongoose");

const locale = require("./src/locale");
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
    companyName: "Gestão de Candidatos",
  },
});

const router = AdminJSExpress.buildRouter(adminJSOptions);

// ============================================
// Server
const express = require("express");
const server = express();

server.use(adminJSOptions.options.rootPath, router);

// =============================================
// Run App
const run = async () => {
  await mongoose.connect("mongodb://localhost/adminJSapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await server.listen(5500, () => console.log("Server started"));
};

run();
