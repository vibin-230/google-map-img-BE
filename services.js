const userRoute = require("./routes/user.route");

module.exports = ({ app, upload }) => {
  userRoute({ app, upload });
};
