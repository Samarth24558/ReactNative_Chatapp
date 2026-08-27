import app from "./src/app";
import {connectDB}  from "./src/config/database";
import {createServer} from "http";

const httpServer=createServer(app)

initializeSocket(httpServer);

const PORT=process.env.PORT || 3000;

connectDB().then(()=>{
    httpServer.listen(PORT,()=>{
        console.log(`Server is running at PORT:${PORT}`)
    })
});