import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
dotenv.config()
const app = express()

import connectDB from './db/connect.js'

import trackRouter from './routes/track.js'
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))
app.use('/api/v1/track', trackRouter)

const port = process.env.PORT || 3000
const start = async ()=>{
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Listening to port: ${port}`)
        })
    } 
    catch (error) {
        console.log(error) 
    }
}

start()