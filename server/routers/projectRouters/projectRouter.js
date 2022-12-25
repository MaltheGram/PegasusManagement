import {Router} from "express"
import db from "../../database/database.js";
import {ObjectId} from "mongodb";
const router = Router()


router.get("/api/projects", async (req, res) => {
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
router.get("/api/projects/insertdummy", async (req, res) => {
    await db.projects.insertMany([
        {name: "Pegasus", status: "open"},
        {name: "Pegasus", status: "analysis"},
        {name: "Pegasus", status: "backlog"},
        {name: "Pegasus", status: "in progress"},
        {name: "Pegasus", status: "ready for test"},
        {name: "Pegasus", status: "ready for deploy"}
    ])
    res.send({data: "inserted dummy data"})
})
router.get("/api/projects/:id", async (req, res) => {
    const id = req.params.id
    let o_id = new ObjectId(id)
    const assignmentData = await db.projects.find({_id: o_id}).toArray()
    res.send({data: assignmentData})
})

router.post("/api/projects", async (req, res) => {
    const project = req.body
    await db.projects.insertOne(project)
    res.status(200).send({data: "Successfully added new project"})
})

router.patch("/api/projects", async (req, res) => {
    console.log("Patch request sent")
    const projectToUpdate = req.body.id
    const projectStatus = req.body.status
    const loggedTime = req.body.loggedTime
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


export default router
