//Satyavachan
//Models naming is generally Capitalized and singular
//Routes naming is small letters and plural
//user.save() takes time like it connects to db and then try to save the user so that might take time so we convert it to async function
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();
app.use(express.json());



//connection to db
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api/users", userRoute);
app.use("/api/pins",pinRoute);

app.listen(process.env.PORT, (req,res) => {
  console.log("Backend server running at 8800 port");
});










