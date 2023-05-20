const getUsers = (req, res) => {
  res.send("getUsers");
};

const getUserDetail = (req, res) => {
  const id = req.params.id;
  res.send(`userId:${id} user detail`);
};

module.exports = { getUserDetail, getUsers };
