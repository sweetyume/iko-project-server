exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      const users = [
        {
          firstname: "Berto",
          lastname: "Ortega",
          username: "LalaBerto",
          email: "berto.ort@gmail.com",
          password: "pineapple"
        },
        {
          firstname: "Hello",
          lastname: "World",
          username: "HelloOit",
          email: "hello@cjr.co.de",
          password: "keyboard_cat"
        }
      ];
      return knex("users").insert(users);
    });
};
