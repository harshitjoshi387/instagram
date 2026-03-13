import { configDotenv } from "dotenv"
import app from "./src/app.js"
import connectToDb from "./src/config/database.js"

configDotenv()

connectToDb()
app.listen(3000,()=>{
    console.log('server is running on the port 3000')
})