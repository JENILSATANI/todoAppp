const mongoose =require("mongoose")
// let databaseUrl = process.env.DATABASE_URL;
let databaseUrl = "mongodb+srv://jpempire3108:jpempire3108@nodeproject.zhuuc.mongodb.net/"
console.log('databaseUrl :>> ', databaseUrl);

mongoose
  .set("strictQuery", true)
  .connect(databaseUrl)
  .then(() => {
    console.log("DB connection established successfully");
  })
  .catch((err) => {
    console.log("Error occured in db connection", err);
  });