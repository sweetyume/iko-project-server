module.exports = {
  authenticate: async (req, res) => {
    const result = await User.getUserById(req.session.id);
    const bddUser = result;
    if (!bddUser) {
      res.send(bddUser);
    } else {
      res.json("error");
    }
  }
};
