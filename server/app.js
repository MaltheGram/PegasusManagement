import express from "express"
const app = express()

import dotenv from "dotenv/config"


import cors from "cors"
app.use(cors({
    credentials: true,
    origin: true
}))

import helmet from "helmet"
app.use(helmet())

import session from "express-session"
const sessionMiddleware = session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        name: process.env.APP_COOKIE,
        secure: false,
        maxAge: 10000 * 60 * 60
    }
})

app.use(sessionMiddleware)

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get("/", (req, res) => {
    res.send({data: "Root"})
})

import http from "http"
import {Server} from "socket.io"
import {instrument} from "@socket.io/admin-ui"

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://admin.socket.io"],
        credentials: true
    }
})
io.on("connect", socket => {
    socket.on("new message", message => {
        io.emit("new message", {
            data: {
                dataMessage: message,
                timestamp: new Date().toLocaleTimeString("en-GB"),
            }
        })
    })
})

instrument(io, {auth: false})
let connectionCounter = 0

import authRouter from "./routers/authRouters/authRouter.js";
app.use(authRouter)

import usersRouters from "./routers/usersRouters/usersRouters.js";
app.use(usersRouters)

import sessionRouters from "./routers/sessionRouters/sessionRouters.js";
app.use(sessionRouters)

import projectRouters from "./routers/projectRouters/projectRouter.js";
app.use(projectRouters)

import commentRouters from "./routers/commentRouters/commentRouters.js";
app.use(commentRouters)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
