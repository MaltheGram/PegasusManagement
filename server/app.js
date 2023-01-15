import express, {request} from "express"
import axios from "axios"
const app = express()

import cors from "cors"
app.use(cors({
    credentials: true,
    origin: true
}))

import helmet from "helmet"
app.use(helmet())

import session from "express-session"
const sessionMiddleware = session({
    secret: "123", // Should be stored in env
    resave: true,
    saveUninitialized: true,
    cookie: {
        name: "pegasus-cookie",
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

instrument(io, {auth: false})
// let connectionCounter = 0
// io.on("connection", socket => {
//     connectionCounter++
//     console.log("A user connected", socket.id)
//     //setInterval(() => {
//     socket.emit(`user connected`, connectionCounter)
//     console.log(`Connections: ${connectionCounter}`)
//     //}, 10000)
//
//     socket.on("disconnect", () => {
//         connectionCounter--
//         console.log("A user disconnected")
//         socket.emit("user disconnected", connectionCounter)
//         console.log(`Connections: ${connectionCounter}`)
//     })
// })

io.on("connect", socket => {
    //let session = socket.handshake.session
    socket.on("new message", message => {
        io.emit("new message", {
            data: {
                dataMessage: message,
                timestamp: new Date().toLocaleTimeString("en-GB"),
            }
        })
    })
})

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
