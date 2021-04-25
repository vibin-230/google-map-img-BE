const user = require("../src/controllers/user.controller");

module.exports = ({ app, upload }) => {
  app.get("/v1/getUser", user.getUser);

  app.post("/v1/createUser", user.createUser);

  app.post("/v1/editPhotos", user.editPhotos);

  // app.post("/v1/deleteUser", user.deleteUser);

  // app.get("/v1/getLocation", user.getLocation);
};
