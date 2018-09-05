exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      const users = [
        {
          user_firstname: "Berto",
          user_lastname: "Ortega",
          user_username: "LalaBerto",
          user_email: "berto.ort@gmail.com",
          user_password: "pineapple"
        },
        {
          user_firstname: "Hello",
          user_lastname: "World",
          user_username: "HelloOit",
          user_email: "hello@cjr.co.de",
          user_password: "keyboard_cat"
        }
      ];
      return knex("users").insert(users);
    });
};
