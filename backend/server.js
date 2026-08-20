import app from "./app.js";
import { db } from "./config/db.js";

//  db:
db();

//  localhost
app.listen(process.env.PORT, () => {
  console.log(`local host running at port ${process.env.PORT}`);
});
