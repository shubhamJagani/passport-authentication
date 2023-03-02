const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected succesfully..!");
  })
  .catch((error) => {
    console.log(error.message);
  });
