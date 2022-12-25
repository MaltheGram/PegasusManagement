import express from "express"
import cors from "cors"

const app = express()
app.use(cors({
    credentials: true,
    origin: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get("/", (req, res) => {
    res.send({data: "Root"})
})

import authRouter from "./routers/authRouters/authRouter.js";
app.use(authRouter)

import projectRouters from "./routers/projectRouters/projectRouter.js";
app.use(projectRouters)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
