const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = async function (knex) {
  return await knex("users").insert([
    {
      name: "Beni Mustiko Aji",
      email: "beni.mustiko.a@gmail.com",
      password: await bcrypt.hash("123", 10),
    },
  ]);
};
