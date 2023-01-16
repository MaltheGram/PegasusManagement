import {Router} from "express"
import db from "../../database/database.js";
import {ObjectId} from "mongodb";
const router = Router()


router.get("/api/projects", async (req, res) => {
    const openStatusArray = await db.projects.find({status: "Open"}).toArray()
    const analysisStatusArray = await db.projects.find({status: "Analysis"}).toArray()
    const backlogStatusArray = await db.projects.find({status: "Backlog"}).toArray()
    const inProgressArray = await db.projects.find({status: "In Progress"}).toArray()
    const readyForTestStatusArray = await db.projects.find({status: "Ready For Test"}).toArray()
    const readyForDeployStatusArray = await db.projects.find({status: "Ready For Deploy"}).toArray()
    const closedStatusArray = await db.projects.find({status: "Closed"}).toArray()

    res.send(
        {
            data: [
                {
                    openStatusArray,
                    analysisStatusArray,
                    backlogStatusArray,
                    inProgressArray,
                    readyForTestStatusArray,
                    readyForDeployStatusArray,
                    closedStatusArray
                }
            ]
        }
    )
})
router.get("/api/projects/:id", async (req, res) => {
    const id = req.params.id
    let o_id = new ObjectId(id)
    const assignmentData = await db.projects.find({_id: o_id}).toArray()
    res.send({data: assignmentData})
})

router.post("/api/projects", async (req, res) => {
    const project = req.body
    project.status = "Open"
    project.loggedTime = ["00", "00"]

    try {
        await db.projects.insertOne(project)
        res.status(200).send({data: "Successfully added new project"})

    } catch (error) {
        res.status(500).send({error})
    }
})

router.patch("/api/projects/:id", async (req, res) => {
    const projectToUpdate = req.params.id
    let o_id = new ObjectId(projectToUpdate)

    try {
        const project = req.body

        await db.projects.updateOne(
            {_id: o_id},
            {
                $set: project
            })
        res.status(200).send({
            data: {
                message: "Successfully updated project",
                project,
            }
        })

    } catch (error) {
        res.status(404).send({data: `${error}`})
    }
})


router.delete("/api/projects/:id", async (req, res) => {
    const projectId = req.params.id
    let o_id = new ObjectId(projectId)

    await db.comments.deleteMany({projectID: projectId})
    await db.projects.deleteOne({_id: o_id})

    res.status(200).send({
        data: {
            id: o_id,
            message: (`${o_id} was successfully deleted`),
        }
    })
})


export default router
