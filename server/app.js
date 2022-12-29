import express from "express"
const app = express()

import cors from "cors"
app.use(cors({
    credentials: true,
    origin: true
}))

import helmet from "helmet";
app.use(helmet())

import session from "express-session"
app.use(session({
    secret: "123", // Should be stored in env
    resave: true,
    saveUninitialized: true,
    cookie: {
        name: "pegasus-cookie",
        secure: false,
        maxAge: 100 * 60 * 60
    }
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get("/", (req, res) => {
    res.send({data: "Root"})
})


import authRouter from "./routers/authRouters/authRouter.js";
app.use(authRouter)

import sessionRouters from "./routers/sessionRouters/sessionRouters.js";
app.use(sessionRouters)

import projectRouters from "./routers/projectRouters/projectRouter.js";
app.use(projectRouters)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
