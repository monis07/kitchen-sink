import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'

const PORT = 3001
const app= express()

app.use(cors())
app.use(express.json())
app.use("/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

mongoose.connect('mongodb+srv://monisazeem:monisazeem@cluster0.94aobgx.mongodb.net/', { dbName: "mono-repo-database" });

