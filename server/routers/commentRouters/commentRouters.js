import {Router} from "express"
import db from "../../database/database.js";
import {ObjectId} from "mongodb";
import {checkAuth} from "../../middleware/auth/auth.js";

const router = Router()


router.get("/api/comments/:projectID", async (req, res) => {
    const projectID = req.params.projectID

    const comments = await db.comments.find({projectID: projectID}).toArray()

    res.status(200).send({data: comments})
})

router.post("/api/comments", async (req, res) => {
    const comment = req.body
    comment.author = `${req.session.firstName} ${req.session.lastName}`

    try {
        await db.comments.insertOne(comment)
        res.status(200).send({data: comment})

    } catch (error) {
        res.status(500).send({error})
    }
})

router.delete("/api/comments/:id", async (req, res) => {
    const commentId = req.params.id
    const o_id = new ObjectId(commentId)

    try {
        await db.comments.deleteOne({_id: o_id})
        res.status(200).send({
            data: {
                id: o_id,
                message: "Successfully deleted comment"
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({data: "Deletion failed"})
    }
})


export default router
