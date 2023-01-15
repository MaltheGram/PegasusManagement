import {Router} from "express"
import db from "../../database/database.js";

const router = Router()


router.get("/api/comments/:projectID", async (req, res) => {
    const projectID = req.params.projectID

    const comments = await db.comments.find({projectID: projectID}).toArray()

    res.status(200).send({data: comments})
})

router.post("/api/comments", async (req, res) => {
    const comment = req.body

    try {
        await db.comments.insertOne(comment)
        res.status(200).send({data: "Successfully added a comment"})

    } catch (error) {
        res.status(500).send({error})
    }


})


export default router
