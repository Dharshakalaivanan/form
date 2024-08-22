import mysql from 'mysql2/promise';
import {config} from 'dotenv'
config()

const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE 
}

export const pool = mysql.createPool(dbConfig)

export const connectToDatabase = async () => {
    try {
        await pool.getConnection()
        console.log("Db connected successfully!")
    } catch (error) {
        console.log("Error connecting database:", error)
        throw new Error(`Error connecting database: ${error}`)
    }
}



