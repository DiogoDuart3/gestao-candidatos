require("dotenv/config");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("./src/models/User");

(async () => {
  await mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let admin = new User({
    name: "Admin",
    email: "admin@admin.com",
    encryptedPassword: await bcrypt.hash("123456", 10),
    role: "admin",
  });

  admin.save((err, user) => {
    if (err) return console.log(err);
    console.log(`${user.email} created`);
  });
})();
