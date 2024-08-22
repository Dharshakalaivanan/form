
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { connectToDatabase } from './database.config.js'
import { appRouter } from "./routes/index.js";


const PORT = process.env.PORT || 5000

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors())
app.use('/app/v1', appRouter)

connectToDatabase().then(() => {
    try {
        app.listen(PORT, ()=>console.log(`Server running in port ${PORT}`));
    } catch (error) {
        process.exit(0)
    }
})
    
