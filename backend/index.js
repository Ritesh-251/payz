import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import {app} from "./app.js"
import connectDB from "./db/index.js";



connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully DB HOST:");
    app.listen( 8000, () => {
      console.log(`Server is running on port ${8000}`);
    });
  })
  .catch((error) => {
    console.log("ERROR:", error);
    process.exit(1); 
  });


      
console.log("radha radha");
console.log("MONGODB_URI:", process.env.MONGODB_URI);




