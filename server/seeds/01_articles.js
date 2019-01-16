exports.seed = (knex, Promise) => {
  return knex("articles")
    .del()
    .then(() => {
      const articles = [
        {
          country: "Japan",
          title: "Karaoke places",
          description: "I had a marvellous time in this special place"
        },
        {
          country: "France",
          title: "Cathédrale",
          description: "Belle, c'est un mot qu'on dirait..."
        }
      ];
      return knex("articles").insert(articles);
    });
};
