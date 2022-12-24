import express from "express"
import db from "./database/database.js";
import cors from "cors"
import {ObjectId} from "mongodb";
import bodyParser from "body-parser";

const app = express()
app.use(cors({
    credentials: true,
    origin: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send({data: "Root"})
})
app.get("/projects", async (req, res) => {
    const findAllProjects = await db.projects.find().toArray()
    const openStatusArray = await db.projects.find({status: "open"}).toArray()
    const analysisStatusArray = await db.projects.find({status: "analysis"}).toArray()
    const backlogStatusArray = await db.projects.find({status: "backlog"}).toArray()
    const inProgressArray = await db.projects.find({status: "in progress"}).toArray()
    const readyForTestStatusArray = await db.projects.find({status: "ready for test"}).toArray()
    const readyForDeployStatusArray = await db.projects.find({status: "ready for deploy"}).toArray()

    if (req.query.delete) {
        await db.projects.deleteMany({name: req.query.delete})
        findAllProjects.length === 1
            ? res.send({data: `Deleted 0 projects`})
            : res.send({data: `Deleted ${findAllProjects.length} projects`})
    } else {
        res.send(
            {
                length: `${findAllProjects.length} Projects`, data: [
                    {
                        openStatusArray,
                        analysisStatusArray,
                        backlogStatusArray,
                        inProgressArray,
                        readyForTestStatusArray,
                        readyForDeployStatusArray
                    }
                ]
            }
        )
    }
})
app.get("/projects/insertdummy", async (req, res) => {
    await db.projects.insertMany([
        {name: "Pegasus 1", status: "open"},
        {name: "Pegasus 2", status: "analysis"},
        {name: "Pegasus 3", status: "backlog"},
        {name: "Pegasus 4", status: "in progress"},
        {name: "Pegasus 5", status: "ready for test"},
        {name: "Pegasus 6", status: "ready for deploy"}
    ])
    res.send({data: "inserted dummy data"})
})
app.get("/projects/:id", async (req, res) => {
    const id = req.params.id
    let o_id = new ObjectId(id)
    const assignmentData = await db.projects.find({_id: o_id}).toArray()
    res.send({data: assignmentData})
})

app.post("/projects", async (req, res) => {
    const project = req.body
    await db.projects.insertOne(project)
    res.status(200).send({data: "Successfully added new project"})
})

app.patch("/projects", async (req, res) => {
    console.log("Patch request sent")
    const projectToUpdate = req.body.id
    const projectStatus = req.body.status
    console.log(req.body)
    let o_id = new ObjectId(projectToUpdate)

    console.log(projectToUpdate, projectStatus)

    await db.projects.updateOne(
        {_id: o_id},
        {
            $set: {status: projectStatus}
        })

    res.status(200).send({data: "Successfully updated project"})

})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
