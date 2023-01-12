import {Router} from "express"
import db from "../../database/database.js";

const router = Router()

router.get("/api/users", async (req, res) => {

    try {
        const users = await db.users.find().toArray()
        let usersArray = []

        users.forEach((user) => {
            usersArray.push({fullName: `${user.firstName} ${user.lastName}`})
        })

        res.status(200).send({data: usersArray})

    } catch (error) {
        res.status(404).send({data: `${error}`})
    }
})


export default router
