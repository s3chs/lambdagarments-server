// ici on va connecter notre application back à la bdd

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  console.error("NAY : database connection failed !!!");
});

mongoose.connection.on("connected", () => {
  console.log("YAY : Database connected !!!");
});
